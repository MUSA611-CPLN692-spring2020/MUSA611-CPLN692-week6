$()
$('#num1')
elem=$('#num1')
elem.val(777) //网页中在elem的位置输入777
elem.val() //显示位置的value

//console中的elemnets,点到button，edit as html, 输入
<div id = 'experiment'><p>I WAS HERE</p></div>
elem = $('experiment')
elem.click(function(e){alert('success')})
//点I was here的地方，就会出现success
