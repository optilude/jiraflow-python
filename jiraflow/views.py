from pyramid.httpexceptions import HTTPFound

from substanced.sdi import mgmt_view
from substanced.form import FormView
from substanced.interfaces import IFolder
from substanced.folder import FolderKeyError

from .resources import JIRAInstanceSchema

#
#   SDI "add" view for documents
#
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
        try:
            self.context[instance.instance_name] = instance
        except FolderKeyError:
            snippet = 'The JIRA instance %s has already been configured.' % instance.url
            self.request.sdiapi.flash(snippet, 'danger', allow_duplicate=True)
        else:
            return HTTPFound(
                self.request.sdiapi.mgmt_path(self.context, '@@contents')
            )
