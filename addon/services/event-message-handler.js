import Service from '@ember/service';
import { A } from '@ember/array';

export function isexist(attrs, name) {
    return A(Object.keys(attrs)).any(o => o === name);
}

export function _lookUpComponent(instance, actionName, arg) {
    const componet = instance;
    const parentView = componet.parentView;
    if (isexist(componet.attrs, actionName)) {
        componet.attrs[actionName].call(this, ...arg);
        return;
    } else if (parentView) {
        _lookUpComponent(parentView, actionName, arg);
    }
}

export default Service.extend({
    upAction(instance, actionName, ...arg) {
        _lookUpComponent(instance, actionName, arg);
    }
});
