export default (state = 0,actions) => {
    switch(actions.type){
        case 'saveQuantity':{
            return actions.value;
        };
        default:return state;
    }
}