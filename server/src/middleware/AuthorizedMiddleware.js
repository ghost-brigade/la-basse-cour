const hasRolesAdmin = async (req, res, next) => {
    let roles = req.user.roles;

    if(roles.includes('ROLE_ADMIN')) {
        next();
    } else {
        return forbiddenResponse(res);
    }
}

export default hasRolesAdmin();