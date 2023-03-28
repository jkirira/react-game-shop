const paths = {
    ADMIN_HOME: '/admin',
    ADMIN_LOGIN: '/admin/login',
    ADMIN_FORGOT_PASSWORD: '/admin/forgot-password',
    ADMIN_RESET_PASSWORD: '/admin/reset-password',
    ADMIN_CATEGORIES: '/admin/categories',
    ADMIN_CATEGORIES_VIEW: '/admin/categories/:categoryId',
    ADMIN_GAMES: '/admin/games',
    ADMIN_GAMES_CREATE: '/admin/games/create',
    ADMIN_GAMES_VIEW: '/admin/games/:gameId',
    ADMIN_GAMES_EDIT: '/admin/games/:gameId/edit',
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
