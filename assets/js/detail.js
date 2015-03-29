
(function($) {

	var riotDetails = {
		init: function() {
			// load champions 
			riotDetails.getChampionData();
  				
		},
		getChampionData: function() {
            apiPageUrl = '/getchampions/';

            $.ajax({
                type: 'GET',
                url : apiPageUrl,
                dataType: 'json',
                success: function(data) {
	                riotDetails.setChampionNames(data);
	                // console.log(data);
	            }   
            });  
		},
		setChampionNames: function(data) {
			$("div.champion-name").each(function() {
				var $championDiv = $(this),
				championId = $championDiv.attr('data-champion-id'); 

				$.each(data.data, function() {

	                var dataChampionName  	= this.name,
	                	dataChampionID	 	= this.id,
	                	dataChampionTitle	= this.title;

	                if (championId == dataChampionID) {
	                	$championDiv.append(dataChampionName+ ', "' +dataChampionTitle+ '"');
	                }
	            });

			});

		}

	};
	//init app
	riotDetails.init();

})(jQuery);