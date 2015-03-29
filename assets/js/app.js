
(function($) {
	var searchName,
		apiPageUrl,
		results = [],
		items = '',
		modalContent = '',
		firstQuery = true;
	
	var Result = function(term, results) {
		this.term = term;
		this.results = results;
	};

	var riotGet = {
		el: {
			$form 					: $('#search-form'),
			$resultsContainer		: $('#results-container'),
			$overlayContainer		: $('#overlay-container'),
			$searchName   			: $('.search-field'),
			$modalCover             : $('.modal-cover')
		},
		init: function() {
			riotGet.el.$form.submit(function(e) {
  				e.preventDefault();
  				searchName = riotGet.el.$searchName.val().toLowerCase();

  				//simple cache: check array for duplicates
  				var repeatCheck = $.grep(results, function(e) {
  					return e.term === searchName;
  				});

  				riotGet.el.$resultsContainer.html('');

  				if (repeatCheck.length === 0) {
  					firstQuery = true;
  					results.push(new Result(searchName, null)); //if original, push to results array
  					riotGet.getSummoner(searchName);
  				} else {
  					firstQuery = false;
  					riotGet.retrieveData(searchName); //else retrieve existing array data
  				}
  				
			});

		},
		getSummoner: function(searchName) {
            apiPageUrl = '/getsummoner/' + searchName;

            $.ajax({
                type: 'GET',
                url : apiPageUrl,
                dataType: 'json',
                success: function(data) {
	                riotGet.setData(data, searchName);
	                // console.log(data);
	            }   
            });  
		},
		retrieveData: function(searchName) {
			for (var i = 0; i < results.length; i++) {
				if (results[i].term === searchName) {
					var data = results[i].results;
					riotGet.setData(data, searchName);
				}
			}
		},
		setData: function(data, searchName) {
			if (data.length === 0) {
				riotGet.el.$resultsContainer.append('<h3>Sorry, no summoners by this name were found.</h3>');
			}
			$.each(data, function() {

                var summonerName  	= this.name,
                	summonerID	 	= this.id,
                	summonerLevel	= this.summonerLevel,
                	summonerRev		= this.revisionDate;

                var d = new Date(0);
				d.setUTCMilliseconds(summonerRev);

                items = '<div class="item" data-level="'+summonerLevel+'" data-rev-date="'+d+'"><div class="summoner-name"><span>'+summonerName+'</span></div><div class="summoner-id"><span>'+summonerID+'</span></div></div>';


                riotGet.el.$resultsContainer.append(items);
 
            });

			riotGet.events();

			//find search name and asscoiate only if first query is true
			if (firstQuery) {
				for (var i = 0; i < results.length; i++) {
					if (results[i].term === searchName) {
						results[i].results = data;
						break;
					}
				}
			}
		},
		events: function() {
			$('.item').on('click', function() {
				var $this 			= $(this),
					dataName		= $this.find('.summoner-name').find('span').html(),
					dataId			= $this.find('.summoner-id').find('span').html(),
		            dataLevel  		= $this.attr('data-level'),
		            dataRevDate 	= $this.attr('data-rev-date');

		        riotGet.openModal(dataName, dataId, dataLevel, dataRevDate);
			});

			riotGet.el.$modalCover.on('click', riotGet.closeModal);
		},
		openModal: function(dataName, dataId, dataLevel, dataRevDate) {

			modalContent = '<div class="modal"><div class="modal-close">X</div><div class="modal-name">'+dataName+'</div><br><div class="modal-id">ID: '+dataId+'</div><br><hr /><br><br><div class="modal-lang modal-text">Level: '+dataLevel+'</div><div class="modal-url modal-text">Last Activity: '+dataRevDate+'</div><br><br><div class="modal-desc modal-text"><a href="summoner/' +dataId+ '/' +dataName+ '" class="match-details"><b>Now dive into the details!</b></a><br>(e.g. match history, wins/losses, champions played)</div></div>';


			riotGet.el.$overlayContainer.append(modalContent);

			riotGet.el.$modalCover.fadeIn(300);
			riotGet.el.$overlayContainer.fadeIn(300);

			$('.modal-close').on('click', function() {
				riotGet.closeModal();
			});
		},
		closeModal: function() {
			riotGet.el.$modalCover.fadeOut(300);
			riotGet.el.$overlayContainer.fadeOut(300);
			riotGet.el.$overlayContainer.html('');
		}
	};
	//init app
	riotGet.init();

})(jQuery);