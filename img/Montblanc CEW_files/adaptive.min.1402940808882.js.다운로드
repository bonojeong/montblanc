(function(c,i){var g="srcset" in document.createElement("img");
var b=function(){this.width=c.innerWidth||i.documentElement.clientWidth;
this.height=c.innerHeight||i.documentElement.clientHeight;
this.pixelRatio=c.devicePixelRatio||1
};
var f=function(d){this.viewport=d;
this.maxWidth=Infinity;
this.maxHeight=Infinity;
this.maxPixelRatio=1;
this.candidates=[]
};
f.prototype={constructor:f,parseImage:function(r){var o=/[^\s]+/,v=/\s(\d+)h/,t=/\s(\d+)w/,p=/\s(\d+((\.\d+)?))x/;
var n=r.getAttribute("x-srcset"),s=this.candidates;
if(n){var q,j=n.split(","),m=j.length;
for(q=0;
q<m;
q+=1){var d=j[q].match(o)[0],u=v.test(j[q])?parseInt(j[q].match(v)[1],10):Infinity,l=t.test(j[q])?parseInt(j[q].match(t)[1],10):Infinity,k=p.test(j[q])?parseFloat(j[q].match(p)[1]):1;
s.push({src:d,height:u,width:l,pixelRatio:k})
}}return this
},getBestCandidate:function(o){var p=this.candidates,k=o.width,t=o.height,j=o.pixelRatio,u=function(y){var v,w=p.length,x=p[0];
for(v=0;
v<w;
v+=1){if(y(p[v],x)){x=p[v]
}}return x
},r=function(x){var v,w=p.length;
for(v=w-1;
v>=0;
v-=1){if(x(p[v])){p.splice(v,1)
}}};
if(p.length===0){return null
}var m=u(function(w,v){return w.width>v.width
});
r(function(v){return v.width<k
});
if(p.length===0){p=[m]
}var l=u(function(w,v){return w.height>v.height
});
r(function(v){return v.height<t
});
if(p.length===0){p=[l]
}var s=u(function(w,v){return w.pixelRatio>v.pixelRatio
});
r(function(v){return v.pixelRatio<j
});
if(p.length===0){p=[s]
}var q=u(function(w,v){return w.width<v.width
});
r(function(v){return v.width>q.width
});
var d=u(function(w,v){return w.height<v.height
});
r(function(v){return v.height>d.height
});
var n=u(function(w,v){return w.pixelRatio<v.pixelRatio
});
r(function(v){return v.pixelRatio>n.pixelRatio
});
return p[0]
}};
var e=function(l){l=l||document;
var j=new b();
var k,d=l.querySelectorAll?l.querySelectorAll("img"):document.querySelectorAll("img"),o=d.length;
for(k=0;
k<o;
k+=1){var n=new f(),p=d[k],m=n.parseImage(p).getBestCandidate(j);
if(m){p.src=m.src
}}};
var a,h=function(d,j){if(c.addEventListener){c.addEventListener(d,j,false)
}else{if(c.attachEvent&&d!=="DOMContentLoaded"){c.attachEvent("on"+d,j)
}}};
h("DOMContentLoaded",function(){e();
c.removeEventListener("load",e,false)
});
h("load",e);
c.srcset=e
}(window,document));