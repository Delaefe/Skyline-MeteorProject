Router.configure({
    layoutTemplate: "main2",
    notFoundTemplate: "notFound"
});

Router.route("/", {
    template: "home"
});

Router.route('/city/:id', {
    template: "city",
    data: function () {
        return Cities.findOne({ _id: this.params.id});
        // Return the document for the selected city (the one whose id is given)
        // The value of this id is given by  this.params.id
    }
});

Router.route('/activity/:id', {
    template: "showActivity",
    data: function (){
        return Activities.findOne({_id: this.params.id})
    }
});

Router.route('/updateCity/:id', {
    template: "updateCity",
    data: function() {
        return Cities.findOne({ _id:this.params.id })
    }    
});

Router.route('/myAccount', {
    template: "myAccount"
});

Router.route("/charts", {
    template: "charts"
});