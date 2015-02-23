from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPInternalServerError,
)

from substanced.util import find_catalog

def find_instance(context, request, instance_id, permission='sdi.view'):
    """Use a catalog search to find the instance with the given id
    """

    catalog = find_catalog(context, 'system')

    content_type = catalog['content_type']
    allowed = catalog['allowed']
    name = catalog['name']

    q = (
        content_type.eq('JIRA Instance') &
        allowed.allows(request, permission) &
        name.eq(instance_id)
    )

    results = q.execute()

    if len(results) == 0:
        raise HTTPNotFound(instance_id)

    if len(results) > 1:
        raise HTTPInternalServerError("More than one record matches %s" % instance_id)

    return results.one()
