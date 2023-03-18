const paths = {
    HOME: '/',
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    CONFIRM_EMAIL: '/confirm-email',
}

const noAuthPaths = [
    paths.HOME,
    paths.LOGIN,
    paths.SIGN_UP,
    paths.FORGOT_PASSWORD,
    paths.RESET_PASSWORD,
    paths.CONFIRM_EMAIL,
]

export {
    paths,
    noAuthPaths,
}
