import Swal from 'sweetalert2';
import toastr from 'toastr'

// DEMO
// https://codeseven.github.io/toastr/demo.html

toastr.options = {
    positionClass: 'toast-top-right',
    hideDuration: 300,
    closeHtml: '<button><i class="icon-off"></i></button>',
    timeOut: 5000,
    closeButton: true,
    progressBar: true,
}

export const _Toastr = {
    error(msg) {
        toastr.error(`${msg} `);
    },
    success(msg) {
        toastr.success(`${msg} `);
    },
    warning(msg) {
        toastr.warning(`${msg} `);
    },
    info(msg) {
        toastr.info(`${msg} `);
    },
};

export const _Swall = {
    error(msg) {
        Swal.fire({
            icon: 'error',
            title: msg,
            confirmButtonColor: "orangered",
        })
    },
    success(msg) {
        Swal.fire({
            icon: 'success',
            title: msg,
            confirmButtonColor: "rgb(222, 104, 169)",
        })
    },
    warning(msg) {
        Swal.fire({
            icon: 'warning',
            title: msg,
            confirmButtonColor: "rgb(212 115 34)",
        })
    },
    // warning(msg) {
    //     toastr.warning(`${msg} `);
    // },
    // info(msg) {
    //     toastr.info(`${msg} `);
    // },
};