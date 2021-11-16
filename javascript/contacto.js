const $form = document.querySelector ('#form')
const $buttonMailto = document.querySelector ('#enviarMail')

$form.addEventListener('submit', enviarForm)

function enviarForm(event) {
    event.preventDefault()
    const form = new FormData(this)
    console.log(form.get('name'))
    $buttonMailto.setAttribute('href',`mailto:noeliariv8@gmail.com?subjet=nombre: ${form.get('name')} correo:${form.get('email')}&body=${form.get('message')}`)
    $buttonMailto.click()
    window.location.reload()
}
//quien quiere enviar el form cuando se abre la ventana del mail debe poner enviar.