(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(13),c=n.n(u),l=n(2),o=function(e){var t=e.filter,n=e.setFilter;return r.a.createElement(r.a.Fragment,null,"filter shown with: ",r.a.createElement("input",{value:t,onChange:function(e){return n(e.target.value)}}))},i=n(14),s=n(3),m=n.n(s),f="/api/persons",d=function(){return m.a.get(f).then((function(e){return e.data}))},E=function(e){return m.a.post(f,e).then((function(e){return e.data}))},b=function(e){return m.a.delete("".concat(f,"/").concat(e.id)).then((function(t){return e}))},h=function(e){return m.a.put("".concat(f,"/").concat(e.id),e).then((function(e){return e.data}))},p=(n(37),function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)}),g=function(e,t,n){n(e),setTimeout((function(){n(null)}),t)},v=function(e){var t=e.persons,n=e.setPersons,a=e.newName,u=e.setNewName,c=e.newNumber,l=e.setNewNumber,o=e.notificationHandler;return r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),""===a||""===c)alert("empty values are not allowed");else{var r=t.find((function(e){return e.name===a}));void 0!==r?window.confirm("".concat(a," is already added to phonebook, replace the old number with a new one??"))&&(console.log("updating ",r),g("Updating user: ".concat(r.name),1500,o),h(Object(i.a)({},r,{number:c})).then((function(e){return d().then((function(e){return n(e)}))})).catch((function(e){404===e.response.status&&(g("Information of : ".concat(r.name," has already ben removed from server.."),1500,o),d().then((function(e){return n(e)})).catch((function(e){return g("Error getting users.",1500,o)}))),e.response.data?g(JSON.stringify(e.response.data),3e3,o):g("Error updating user: ".concat(r.name),1500,o)}))):E({name:a,number:c}).then((function(e){n(t.concat(e)),u(""),l("")})).catch((function(e){e.response.data?g(JSON.stringify(e.response.data),3e3,o):g("Error adding new user: ".concat(a),1500,o)}))}}},r.a.createElement("table",null,r.a.createElement("thead",null),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"name"),r.a.createElement("td",null,r.a.createElement("input",{value:a,onChange:function(e){return u(e.target.value)}}))),r.a.createElement("tr",null,r.a.createElement("td",null,"number"),r.a.createElement("td",null,r.a.createElement("input",{value:c,onChange:function(e){return l(e.target.value)}}))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("button",{type:"submit"},"add"))))))},w=function(e){var t=e.filter,n=e.persons,a=e.setPersons,u=e.notificationHandler,c=function(e){return function(){window.confirm("Delete ".concat(e.name," ?"))&&(g("Deleting user: ".concat(e.name),1500,u),b(e).then((function(e){return a(n.filter((function(t){return t.id!==e.id})))})).catch((function(e){return g("Error deleting user, is jsonServer up?",2e3,u)})))}},l=""===t?n:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("thead",null),r.a.createElement("tbody",null,l.map((function(e){return r.a.createElement("tr",{key:e.name},r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:c(e)},"delete")))})))))},N=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),s=i[0],m=i[1],f=Object(a.useState)(""),E=Object(l.a)(f,2),b=E[0],h=E[1],N=Object(a.useState)(""),j=Object(l.a)(N,2),O=j[0],S=j[1],y=Object(a.useState)(null),k=Object(l.a)(y,2),C=k[0],P=k[1];return Object(a.useEffect)((function(){d().then((function(e){u(e)})).catch((function(e){g("Error fetching users, is jsonServer up?",2e3,P)}))}),[]),r.a.createElement("div",null,r.a.createElement(p,{message:C}),r.a.createElement("h2",null,"PhoneBook"),r.a.createElement(o,{filter:O,setFilter:S}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(v,{persons:n,setPersons:u,newName:s,setNewName:m,newNumber:b,setNewNumber:h,notificationHandler:P}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(w,{filter:O,persons:n,setPersons:u,notificationHandler:P}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.415d8d2f.chunk.js.map