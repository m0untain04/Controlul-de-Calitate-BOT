global.sleeper = function sleeper(ms) {
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }
global.bytesToSize = function bytesToSize(bytes) 
{
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
global.GenerateDate = function GenerateDate()
{
  var ziua = new Date().getDate();
    if(ziua < 10)
    {
      var strziua = "0"+ziua;
    }
    else
    {
      var strziua = ziua;
    }
    var luna = new Date().getMonth() + 1;
    if(luna < 10)
    {
      var strluna = "0"+luna;
    }
    else
    {
      var strluna = luna;
    }
    var an = new Date().getFullYear();
    var ora = new Date().getHours();
    if(ora < 10)
    {
      var strora = "0"+ora;
    }
    else
    {
      var strora = ora;
    }
    var minut = new Date().getMinutes();
    if(minut < 10)
    {
      var strminut = "0"+minut;
    }
    else
    {
      var strminut = minut;
    }
    var secunda = new Date().getSeconds();
    if(secunda < 10)
    {
      var strsecunda = "0"+secunda;
    }
    else
    {
      var strsecunda = secunda;
    }
    return `${strziua}/${strluna}/${an} ${strora}:${strminut}:${strsecunda}`
}