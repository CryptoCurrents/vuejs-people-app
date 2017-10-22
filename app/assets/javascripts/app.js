document.addEventListener('DOMContentLoaded', function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      newPersonName: "",
      newPersonBio: "",
      errors: [],
      nameFilter: ""
    },
    mounted: function() {
      $.get('/api/v1/people.json', function(data) {
        this.people = data;
      }.bind(this));
    },
    methods: {
      toggleBio: function(inputPerson) {
        inputPerson.bioVisible = !inputPerson.bioVisible;
      },
      addPerson: function() {
        var params = {
                         name: this.newPersonName,
                         bio: this.newPersonBio
                        };
        
        $.post('/api/v1/people.json', params, function(newPerson) {
          this.people.push(newPerson);
          this.newPersonName = "";
          this.newPersonBio = "";
          this.errors = [];
        }.bind(this)).fail(function(response) {
          this.errors = response.responseJSON.errors;
        }.bind(this));
      },
      deletePerson: function(inputPerson) {
        $.ajax({
          type: 'DELETE',
          url: `/api/v1/people/${inputPerson.id}.json`,
          contentType: 'application/json',
          success: function(newPeople) {
            this.people = newPeople;
          }.bind(this)
        });
      },
      isValidPerson: function(inputPerson) {
        return inputPerson.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
      }
    },
    computed: {

    }
  });
});





