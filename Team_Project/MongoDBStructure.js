// Card is Answer

// List is Question

//Structure of User document
{
	_id: ,
	userName,
	password,
	emailId,
	profile:{picture: , description:,dob, gender, address:{Line1,Line2,country, region, city, postalCode},education:{primary:, highSchool, university}, phone },
	lists:[{_id: ,	heading:,	category:,	statement:,	image:,	addedOn:,upVote:,    downVote:},
			{_id: ,	heading:,	category:,	statement:,	image:,	addedOn:,upVote:,    downVote:},
			{_id: ,	heading:,	category:,	statement:,	image:,	addedOn:,upVote:,    downVote:},
			{_id: ,	heading:,	category:,	statement:,	image:,	addedOn:,upVote:,    downVote:},
			{_id: ,	heading:,	category:,	statement:,	image:,	addedOn:,upVote:,    downVote:}],
	answers: [{_id:, statement:, addedOn:, image:, upVote:, downVote:},
			{},
			{},
			{}]		
	/*Embedded List documents ordered by rating/recent/random/others ?*/
	watchingList: [{heading:,category:, statement:, postedBy:, addedOn:, noofans:, upVotes:, downVotes:},{},{},{},{}],
    watchingTopic: [{Java_Threading:[{List obj based on? rating/recent/random/others},
                           {}]},
                     {Neo4J_property_graph:[{List obj based on? How many? rating/recent/random/others},
                           {}]},
                   ]
     interestCategory:['categoryName1','categoryName2','categoryName3','categoryName4','categoryName5','categoryName6'],
     reputation://score based on application-specific algorithm,
     followingUser: [234,456,777,980],
     followerCount:Number,
     report:[{type:,count:,}],
     comments: [{commentText:,commentedBy:, commentedOn:},{commentText:,commentedBy:, commentedOn:} ]
}





//Structure of List document
{
	_id: ,	
	category:,	
	tags:,
	heading:,
	statement/question:,
	image:,
	addedOn:,
	upVotes:,
    downVotes:,
    answerCounts:,
    status: {open: , close: {closedBY:, closedOn:, reason:}},
    topCards:[{createdBy:, content:,createdOn:,image:,upVote:,downVote:,isAccepted:boolean},
              {},{}],
    comments: [{commentText:,commentedBy:, commentedOn:},{commentText:,commentedBy:, commentedOn:} ],
}







//Structure of Card document

{
	_id:,
	createdBy:	
	content:,	
	answeredOn:,	
	image:,
	upVote:,
    downVote:,
    comments: [{commentText:,commentedBy:, commentedOn:},{commentText:,commentedBy:, commentedOn:} ],
    isAccepted:boolean
}





//Structure of Category document
{
	-id,
	name,
	description,
	image:,
	
	followers:[2315,1233,1868]//Graph or Mongo?
}


