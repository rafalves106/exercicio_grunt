document.addEventListener('DOMContentLoaded', function() {
    const formOpenedOnLoad = document.getElementById("form-before");
    const submitBtn = document.getElementById("submit-btn");
    const afterForm = document.getElementById("form-after");
    
    formOpenedOnLoad.classList.add("enabled")
    afterForm.classList.add("disabled")

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        formOpenedOnLoad.classList.remove("enabled");
        formOpenedOnLoad.classList.add("disabled");

        afterForm.classList.remove("disabled");
        afterForm.classList.add("enabled");

    })
})