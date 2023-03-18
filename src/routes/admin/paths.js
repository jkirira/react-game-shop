const paths = {
    ADMIN_HOME: '/admin',
    ADMIN_LOGIN: '/admin/login',
    ADMIN_FORGOT_PASSWORD: '/admin/forgot-password',
    ADMIN_RESET_PASSWORD: '/admin/reset-password',
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
