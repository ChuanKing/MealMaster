exports.getReport = (menu) => {
    return menu.map(item => {

        if (typeof item == 'string') {
            return item;
        }

        const dish = [];

        if (item.meat && item.meat.name) {
            dish.push(item.meat.name);
        }

        if (item.veggie && item.veggie.name) {
            dish.push(item.veggie.name);
        }

        return dish.join('+');
    });
}

