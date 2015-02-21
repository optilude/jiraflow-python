"""Resource definition for the JIRA instance content type
"""

import urlparse
import colander
import deform.widget

from pyramid.httpexceptions import HTTPFound

from substanced.content import content
from substanced.folder import (
    Folder,
    FolderKeyError,
)

from substanced.property import PropertySheet
from substanced.schema import Schema

from substanced.util import renamer

from substanced.sdi import mgmt_view
from substanced.form import FormView
from substanced.interfaces import IFolder

def short_name(url):
    """Given a URL, return the location without a protocol or path
    """
    return urlparse.urlparse(url).netloc

@colander.deferred
def jira_url_validator(node, kw):
    """Validate that the URL is valid, and also that the short name doesn't
    exist in the parent already.
    """
    request = kw['request']
    context = request.context

    if request.registry.content.typeof(context) == 'JIRA Instance':
        parent = context.__parent__
        instance = context
    else:
        parent = context
        instance = None

    def namecheck(node, value):
        try:
            new_name = short_name(value)

            # Only check if we are creating new content or actually changing the name
            if instance is None or instance.__name__ != new_name:
                parent.check_name(new_name)
        except FolderKeyError:
            raise colander.Invalid(node, "Another configuration already exists for this JIRA instance", value)
        except Exception as e:
            raise colander.Invalid(node, e.args[0], value)

    return colander.All(
        colander.url,
        namecheck,
    )


class JIRAInstanceSchema(Schema):

    # name = NameSchemaNode(
    #     editing=lambda context, request: request.registry.content.istype(context, 'JIRA Instance'),
    # )

    title = colander.SchemaNode(
        colander.String(),
        validator=colander.Length(1)
    )

    url = colander.SchemaNode(
        colander.String(),
        title="URL of JIRA instance",
        validator=jira_url_validator
    )

    username = colander.SchemaNode(
        colander.String(),
        title="Username for accessing JIRA",
        validator=colander.Length(1)
    )

    password = colander.SchemaNode(
        colander.String(),
        title="Password for accessing JIRA",
        widget=deform.widget.PasswordWidget(redisplay=True),
    )

class JIRAInstancePropertySheet(PropertySheet):
    schema = JIRAInstanceSchema()

@content('JIRA Instance',
    icon='glyphicon glyphicon-tower',
    add_view='add_jira_instance',
    propertysheets=(('Basic', JIRAInstancePropertySheet),),
)
class JIRAInstance(Folder):
    """A remote JIRA instance to analyse
    """

    name = renamer()

    def __init__(self, title='', url='', username='', password=''):
        super(JIRAInstance, self).__init__()
        self.title = title
        self.url = url
        self.username = username
        self.password = password

    @property
    def url(self):
        return self._url
    @url.setter
    def url(self, value):
        self._url = value

        instance_name = self.instance_name
        if instance_name:
            self.name = instance_name

    @property
    def instance_name(self):
        return short_name(self.url)


@mgmt_view(
    context=IFolder,
    name='add_jira_instance',
    tab_title='Add JIRA instance',
    permission='sdi.add-content',
    renderer='substanced.sdi:templates/form.pt',
    tab_condition=False,
)
class AddJIRAInstanceView(FormView):
    title = 'Add JIRA Instance'
    schema = JIRAInstanceSchema()
    buttons = ('add',)

    def add_success(self, appstruct):
        registry = self.request.registry
        instance = registry.content.create('JIRA Instance', **appstruct)
        self.context[instance.instance_name] = instance

        return HTTPFound(
            self.request.sdiapi.mgmt_path(self.context, '@@contents')
        )
