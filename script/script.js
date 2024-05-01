"use strict";
const find = (selector) => {
    return document.querySelector(selector);
}
const findAll = (selector) => {
    return document.querySelectorAll(selector);
}

const body = find("body");

body.style.height = `${window.innerHeight}px`;

const next1 = find("#next1");
const next2 = find("#next2");
const previous1 = find("#previous1");
const previous2 = find("#previous2");
const layer1 = find('.step1');
const layer2 = find('.step2');
const layer3 = find('.step3');
const progress = find('.progress');
const stage2 = find('#stage2');
const stage3 = find('#stage3');
const email = find('#email');
const password = find('#password');
const passwordConfirm = find('#passwordConfirm');
const address = find('.address');
const emailStatus = find('#validationEmail');
const passwordConfirmStatus = find('#validationPassword');
const allInputsStep2 = findAll('.step2 > input');
const link1 = find("#link1");
const link2 = find("#link2");
const link3 = find("#link3");
const phoneInput = find('#phoneNum');
const allInputsStep3 = findAll('.step3 > input, textarea');
const submit = find("#submit");
const telStatus = find("#phoneValidation");
let percentGreen = 0;


// progressBar animation
const checkedStage = (stage) => {
    stage.style.backgroundColor = '#38ad60';
    stage.style.color = 'white';
    progress.style.background = `linear-gradient(90deg, #38ad60 ${percentGreen += 50}%, white 0%)`;
}

const unCheckedStage = (stage) => {
    stage.style.backgroundColor = 'white';
    stage.style.color = 'black';
    progress.style.background = `linear-gradient(90deg, #38ad60 ${percentGreen -= 50}%, white 0%)`;
}

// animation functions
const animationIn = (layer) => {
    layer.style.animationName = 'slideIn';
    layer.style.animationDuration = "0.5s";
}
const animationOut = (layer) => {
    layer.style.animationName = 'slideOut';
    layer.style.animationDuration = "0.5s";
}
const hiddeDivAnimation = (layer) => {
    layer.style.animationName = 'opacityIn';
    layer.style.animationDuration = "0.5s";
}
const exposeDiv = (layer) => {
    layer.style.animationName = 'opacityOut';
    layer.style.animationDuration = "0.5s";
}
const addHiddenClass = (layer1, layer2) => {
    layer1.classList.toggle("hidden");
    layer2.classList.toggle("hidden");
}

// animation orders
const orders1 = (layer1, layer2) => {
    setTimeout(() => {
        addHiddenClass(layer1, layer2);
    }, 300)
    setTimeout(() => {
        animationIn(layer2);
    }, 200)
    setTimeout(() => {
        hiddeDivAnimation(layer1);
    }, 100)
}

const orders2 = (layer1, layer2) => {
    setTimeout(() => {
        addHiddenClass(layer1, layer2);
    }, 300)
    setTimeout(() => {
        exposeDiv(layer1);
    }, 200)
    setTimeout(() => {
        animationOut(layer2);
    }, 100)
}

// config validations
const emailCheck = (input) => {
    return String(input)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const emptyInputCheck = (input) => {
    return String(input)
        .toLowerCase()
        .match(/^\s*$/);
};

const passwordCheck = (input) => {
    return String(input)
        .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/);
}

// email validation function

const emailValidation = (email) => {
    const emailValue = email.value;
    if (!emptyInputCheck(emailValue)) {
        if (emailCheck(emailValue)) {
            emailStatus.style.color = "#38ad60";
            emailStatus.innerHTML = "<em>Valid email!</em>"
            return true;
        } else {
            emailStatus.style.color = "red";
            emailStatus.innerHTML = "<em>Invalid email!</em>"
        }
    } else {
        emailStatus.innerHTML = " ";
    }
    return false;
}

// password Validation function
const passwordValidation = (password) => {
    const passwordValue = password.value;
    const passwordConfirmValue = passwordConfirm.value;
    if (emptyInputCheck(passwordValue) && emptyInputCheck(passwordConfirmValue)) {
        passwordConfirmStatus.innerHTML = " ";
        return false;
    }
    if (passwordValue !== passwordConfirmValue) {
        passwordConfirmStatus.style.color = "red";
        passwordConfirmStatus.innerHTML = "<em>Invalid password!</em>";
        return false;
    }
    if (!(passwordCheck(passwordValue) && passwordCheck(passwordConfirmValue))) {
        passwordConfirmStatus.style.color = "red";
        passwordConfirmStatus.innerHTML = "<em>Password must contain at least ( 8 charaters, 1 uppercase, 1 special charater ) </em>";
        return false;
    }
    passwordConfirmStatus.style.color = "#38ad60";
    passwordConfirmStatus.innerHTML = "<em>Valid password!</em>";
    return true;
}


// function to enable button on first layer
const enableButtonV1 = (email, password, button) => {
    if (emailValidation(email) && passwordValidation(password)) {
        button.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled', "true")
    }
}

// function to enable button on second layer
const enableButtonV2 = (inputs, button) => {
    let count = 0;
    inputs.forEach(item => {
        if (!emptyInputCheck(item.value)) {
            count++;
        }
    })
    if (inputs.length === count) {
        button.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled', "true")
    }
}

// applying validation function on first layer
email.addEventListener('keyup', () => {
    emailValidation(email);
    enableButtonV1(email, password, next1);
})

password.addEventListener('keyup', () => {
    passwordValidation(password);
    enableButtonV1(email, password, next1);
})

passwordConfirm.addEventListener('keyup', () => {
    passwordValidation(password);
    enableButtonV1(email, password, next1);
})

// applying validation function on second layer

link1.addEventListener("change", () => {
    enableButtonV2(allInputsStep2, next2);
})
link2.addEventListener("change", () => {
    enableButtonV2(allInputsStep2, next2);
})
link3.addEventListener("input", () => {
    enableButtonV2(allInputsStep2, next2);
})

// applying validations on third layer
// phone number validation && mask
phoneInput.addEventListener('input', function (event) {
    let result = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/);
    if (!result[2]) {
        event.target.value = result[1];
        submit.setAttribute('disabled', "true")
    } else {
        event.target.value = '+' + result[1] + ' (' + result[2] + ') ' + result[3];
        if (result[4]) {
            event.target.value += ' ' + result[4];
            submit.setAttribute('disabled', "true")
        }
        if (result[5]) {
            event.target.value += ' ' + result[5];
            submit.removeAttribute('disabled')
        }
    }
});

// button events
next1.addEventListener('click', () => {
    orders1(layer1, layer2);
    checkedStage(stage2);
})

next2.addEventListener('click', () => {
    orders1(layer2, layer3);
    checkedStage(stage3);
})

previous1.addEventListener('click', () => {
    orders2(layer1, layer2);
    unCheckedStage(stage2);
})

previous2.addEventListener('click', () => {
    orders2(layer2, layer3);
    unCheckedStage(stage3);
})



