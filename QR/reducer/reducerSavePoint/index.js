export default (state = 0,actions) => {
    switch(actions.type){
        case 'savePoint':{
            return actions.value;
        };
        default:return state;
    }
}