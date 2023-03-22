const paths = {
    ADMIN_HOME: '/admin',
    ADMIN_LOGIN: '/admin/login',
    ADMIN_FORGOT_PASSWORD: '/admin/forgot-password',
    ADMIN_RESET_PASSWORD: '/admin/reset-password',
    ADMIN_CATEGORIES: '/admin/categories',
    ADMIN_CATEGORIES_CREATE: '/admin/categories/create',
}

const requireNoAuthPaths = [
    paths.ADMIN_LOGIN,
    paths.ADMIN_FORGOT_PASSWORD,
    paths.ADMIN_RESET_PASSWORD,
]

export {
    paths,
    requireNoAuthPaths,
}
