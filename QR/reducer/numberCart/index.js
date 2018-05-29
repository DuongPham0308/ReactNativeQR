export default (state = [],actions) => {
    switch(actions.type){
        case 'saveCart':{
            return actions.value;
        };
        default:return state;
    }
}