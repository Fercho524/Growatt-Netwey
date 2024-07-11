export const sayHello = (req,res) => {
    res.json({
        'message': 'welcome',
        'version': '0.0.1',
        'author': 'fercho524'
    })
}
