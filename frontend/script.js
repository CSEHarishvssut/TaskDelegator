function buildEmail(){
    const name=document.getElementById("name").value;
    const pos=document.getElementById("position").value;
    const status=document.querySelector("input[name='status']:checked").value;

    let txt="";

    if(status==="selected"){
        txt = `Dear ${name},

Congratulations! You are selected for the position ${pos}.

Regards,
HR Team`;
    } else {
        txt = `Dear ${name},

Thank you for applying for ${pos}.
Unfortunately we moved forward with other candidates.

Regards,
HR Team`;
    }

    document.getElementById("preview").value=txt;
}

async function sendEmail(){
    const email=document.getElementById("email").value;
    const message=document.getElementById("preview").value;

    const res=await fetch("http://localhost:3000/send",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,message})
    });

    let data=await res.json();
    document.getElementById("msg").innerHTML=data.msg;
}
