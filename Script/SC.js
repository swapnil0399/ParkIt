function myFunction(){
    if (document.getElementById("1").src == "download.png")
    {
        document.getElementById("1").src = "download1.png";
    }
    else
    {
        document.getElementById("1").src = "download.png";
    }
};

function openForm() {
    document.getElementById("myForm").style.display = "block";
};
 
function closeForm() {
    document.getElementById("myForm").style.display = "none";
};