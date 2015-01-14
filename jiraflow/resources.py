import urlparse
import colander
import deform.widget

from substanced.content import content
from substanced.folder import (
    Folder,
    FolderKeyError,
)

from substanced.property import PropertySheet
from substanced.schema import (
    Schema,
    NameSchemaNode,
)

from substanced.util import renamer

#
# JIRA instance
#

def short_name(url):
    """Given a URL, return the most specific subdomain
    """
    netloc = urlparse.urlparse(url).netloc
    if netloc:
        return netloc.split('.')[0]
    else:
        return None

@colander.deferred
def url_validator(node, kw):
    request = kw['request']
    context = request.context
    if request.registry.content.typeof(context) == 'JIRA Instance':
        context = context.__parent__

    def namecheck(node, value):
        try:
            context.check_name(short_name(value))
        except FolderKeyError:
            raise colander.Invalid(node, "A configuration for JIRA instance has already been added", value)
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
        validator=url_validator
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

