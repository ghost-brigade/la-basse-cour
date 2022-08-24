export const env = {
    'server': {
      	 'port': 3000,
    },
    'database': {
        'postgres': 'postgres://admin:password@127.0.0.1:5432/app',
        'mongo': 'mongodb://root:password@127.0.0.1:27017/app?authSource=admin'
    },
    'mailer': {
        'host': "smtp.ethereal.email",
        'port': 587,
        'secure': false,
        'auth': {
            'user': 'shemar40@ethereal.email',
            'pass': 'eDntfWpCnFWMQV1psX'
        }
    },
    'secret': 'UkozsMpFEUMnpYakfo7bKdzEb7h8qjVrSBxJAg',
    'url': 'http://localhost:3001',
}
