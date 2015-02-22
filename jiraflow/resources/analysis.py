"""Resource definition for the analysis content type
"""

import urllib
import colander
import deform.widget

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

from ..analysis.cache import AnalysisCache
from ..constants import AnalysisTypes

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

    return colander.All(
        colander.Length(1),
        namecheck,
    )

class AnalysisParameter(colander.Schema):
    key = colander.SchemaNode(colander.String())
    value = colander.SchemaNode(colander.String())

class AnalysisParameters(colander.SequenceSchema):
    parameter = AnalysisParameter()

class AnalysisSchema(Schema):

    title = colander.SchemaNode(
        colander.String(),
        validator=name_validator
    )

    description = colander.SchemaNode(
        colander.String(),
        missing=None,
        widget=deform.widget.TextAreaWidget(rows=5)
    )

    type = colander.SchemaNode(
        colander.String(),
        validator=colander.OneOf(AnalysisTypes.values()),
        widget=deform.widget.SelectWidget(values=AnalysisTypes.items())
    )

    refresh_interval = colander.SchemaNode(
        colander.Int(),
        description="Number of minutes to cache JIRA query results for.",
        validator=colander.Range(min=0)
    )

    query = colander.SchemaNode(
        colander.String(),
        missing=None,
        description="JQL query specifying the data to include in the analysis."
    )

    parameters = AnalysisParameters(
        missing=None,
        description="Analysis-specific parameters."
    )

class AnalysisPropertySheet(PropertySheet):
    schema = AnalysisSchema()

@content('Analysis',
    icon='glyphicon glyphicon-list-alt',
    add_view=lambda context, request: 'add_analysis' if request.registry.content.istype(context, 'JIRA Instance') else None,
    propertysheets=(('Basic', AnalysisPropertySheet),),
    after_create='after_create',
)
class Analysis(Persistent):
    """An analysis created for a particular JIRA instance
    """

    name = renamer()

    def __init__(self, title='', description='', type='', refresh_interval=0, query='', parameters=None):
        super(Analysis, self).__init__()

        if parameters is None:
            parameters = {}

        self.title = title
        self.description = description
        self.type = type
        self.refresh_interval = refresh_interval
        self.query = query
        self.parameters = parameters

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

    def after_create(self, inst, registry):
        self.cache = AnalysisCache(inst.refresh_interval)

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
