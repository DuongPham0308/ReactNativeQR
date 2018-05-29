export default (state = null,actions) => {
    switch(actions.type){
        case 'save':{
            return actions.value;
        };
        default:return state;
    }
}