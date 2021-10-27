import React from 'react'

export default (tg,arr)=>{
    if(tg.target.checked == true) {
        arr.push(tg.target.value)
    }
    else{
        const i = arr.findIndex(dat => dat ===tg.target.value)
        if(i >=0) arr.splice(i,1)
    }

    // console.log(arr)
    // console.log(tg.target.checked)

    return arr.toString()
}
