function authorize(...allowedRoles) {
    return (req, res, next) => {
        // 1. validate
        if (!req.user) {
            return res.status(401).json({message: 'Unauthenticated user. Please login again.'});
        }
        
        // 2. authorize
        const role = req.user.role.toLowerCase();

        if (!allowedRoles.includes(role)) {
            console.log('Unauthorized user. Required roles:', allowedRoles, 'User role:', role);
            return res.status(403).json({
                message: 'Unauthorized user. You do not have permission to perform this action.',
                requiredRoles: allowedRoles
            });
        }

        // 3. call the next middleware or route handler.
        next();
    }
}

module.exports = authorize;