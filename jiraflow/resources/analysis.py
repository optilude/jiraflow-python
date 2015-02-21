"""Resource definition for the analysis content type
"""

import urllib
import colander

from persistent import Persistent

from pyramid.httpexceptions import HTTPFound

from substanced.content import content
from substanced.folder import FolderKeyError

from substanced.property import PropertySheet
from substanced.schema import Schema

from substanced.util import renamer

from substanced.sdi import mgmt_view
from substanced.form import FormView
from substanced.interfaces import IFolder

def short_name(title):
    """Given a title, return a url-friendly name
    """
    return urllib.quote(title.strip().lower().replace(u' ', u'-'))

@colander.deferred
def name_validator(node, kw):
    """Validate that the short name doesn't exist in the parent already.
    """
    request = kw['request']
    context = request.context

    # Add or edit form?
    if request.registry.content.typeof(context) == 'Analysis':
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
            raise colander.Invalid(node, "Another analysis already exists with this name", value)
        except Exception as e:
            raise colander.Invalid(node, e.args[0], value)

    return namecheck

class AnalysisSchema(Schema):

    title = colander.SchemaNode(
        colander.String(),
        validator=name_validator
    )

class AnalysisPropertySheet(PropertySheet):
    schema = AnalysisSchema()

@content('Analysis',
    icon='glyphicon glyphicon-list-alt',
    add_view=lambda context, request: 'add_analysis' if request.registry.content.istype(context, 'JIRA Instance') else None,
    propertysheets=(('Basic', AnalysisPropertySheet),),
)
class Analysis(Persistent):
    """An analysis created for a particular JIRA instance
    """

    name = renamer()

    def __init__(self, title=''):
        super(Analysis, self).__init__()
        self.title = title

    @property
    def title(self):
        return self._title
    @title.setter
    def title(self, value):
        self._title = value

        name = self.analysis_name
        if name:
            self.name = name

    @property
    def analysis_name(self):
        return short_name(self.title)

@mgmt_view(
    context=IFolder,
    name='add_analysis',
    tab_title='Add Analysis',
    permission='sdi.add-content',
    renderer='substanced.sdi:templates/form.pt',
    tab_condition=False,
)
class AddAnalysisInstanceView(FormView):
    title = 'Add Analysis'
    schema = AnalysisSchema()
    buttons = ('add',)

    def add_success(self, appstruct):
        registry = self.request.registry
        instance = registry.content.create('Analysis', **appstruct)
        self.context[instance.analysis_name] = instance

        return HTTPFound(
            self.request.sdiapi.mgmt_path(self.context, '@@contents')
        )
