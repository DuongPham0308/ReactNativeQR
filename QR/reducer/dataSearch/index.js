export default (state = [],actions) => {
    switch(actions.type){
        case 'saveDataSearch':{
            return actions.value;
        };
        default:return state;
    }
}