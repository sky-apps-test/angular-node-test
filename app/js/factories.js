skyAppTest.factory(
    "formDataSerializer",
    function() {
        var serializeFormData = function (data) {
            var serializedData = [];

            for (var name in data) {
                if (data.hasOwnProperty(name) === false) {
                    continue;
                }

                var value = data[ name ];

                serializedData.push(
                    encodeURIComponent( name ) +
                    "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );
            }

            return serializedData.join('&');
        };

        return serializeFormData;
    }
);
