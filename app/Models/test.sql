CREATE TABLE `actors` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `year` smallint(6) NOT NULL,
  `rating` double NOT NULL,
  `synopsis` varchar(1000) NOT NULL,
  `trailer` varchar(50) NOT NULL,
  `runtime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `movie_genres` (
  `id` int(11) NOT NULL,
  `fk_id_movie` int(11) NOT NULL,
  `fk_id_genre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `movie_images` (
  `id` int(11) NOT NULL,
  `fk_id_movie` int(11) NOT NULL,
  `cover` varchar(50) NOT NULL,
  `background` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `actor_images` (
  `id` int(11) NOT NULL,
  `fk_id_actor` int(11) NOT NULL,
  `photo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `my_lists` (
  `id` int(11) NOT NULL,
  `fk_id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `my_list_items` (
  `id` int(11) NOT NULL,
  `fk_id_movie` int(11) NOT NULL,
  `fk_id_my_list` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `fk_id_movie` int(11) NOT NULL,
  `fk_id_actor` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `type_user` tinyint(1) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `actors`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `movie_genres`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `movie_images`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `actor_images`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `my_lists`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `my_list_items`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `movie_genres`
  ADD CONSTRAINT `FK ID GENRE` FOREIGN KEY (`fk_id_genre`) REFERENCES `genres` (`id`),
  ADD CONSTRAINT `FK ID MOVIE GENRES` FOREIGN KEY (`fk_id_movie`) REFERENCES `movies` (`id`);

ALTER TABLE `my_lists`
  ADD CONSTRAINT `FK ID USER` FOREIGN KEY (`fk_id_user`) REFERENCES `users` (`id`);

ALTER TABLE `my_list_items`
  ADD CONSTRAINT `FK ID MOVIE LIST` FOREIGN KEY (`fk_id_movie`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `FK ID MY LIST` FOREIGN KEY (`fk_id_my_list`) REFERENCES `my_lists` (`id`);

ALTER TABLE `roles`
  ADD CONSTRAINT `FK ID ACTOR` FOREIGN KEY (`fk_id_actor`) REFERENCES `actors` (`id`),
  ADD CONSTRAINT `FK ID MOVIE` FOREIGN KEY (`fk_id_movie`) REFERENCES `movies` (`id`);

ALTER TABLE `actor_images`
  ADD CONSTRAINT `FK ID ACTOR IMAGES` FOREIGN KEY (`fk_id_actor`) REFERENCES `actors` (`id`);

ALTER TABLE `movie_images`
  ADD CONSTRAINT `FK ID MOVIE IMAGES` FOREIGN KEY (`fk_id_movie`) REFERENCES `movies` (`id`);

INSERT INTO `actors` (`id`, `name`) VALUES
(1, 'Sacha Baron Cohen'),
(2, 'Anna Faris'),
(3, 'Ben Kingsley'),
(4, 'Andrew Garfield'),
(5, 'Sam Worthington'),
(6, 'Vince Vaughn'),
(7, 'Teresa Palmer'),
(8, 'Jason Mantzoukas'),
(9, 'Marlon Brando'),
(10, 'Al Pacino'),
(11, 'James Caan'),
(12, 'Robert Duvall'),
(13, 'John Travolta'),
(14, 'Samuel L. Jackson'),
(15, 'Uma Thurman'),
(16, 'Bruce Willis'),
(17, 'Tom Hanks'),
(18, 'Robin Wright'),
(19, 'Gary Sinise'),
(20, 'Mykelti Williamson'),
(21, 'Brad Pitt'),
(22, 'Morgan Freeman'),
(23, 'Gwyneth Paltrow'),
(24, 'R. Lee Ermey'),
(25, 'Matthew McConaughey'),
(26, 'Anne Hathaway'),
(27, 'Jessica Chastain'),
(28, 'Mackenzie Foy'),
(29, 'Adrien Brody'),
(30, 'Thomas Kretschmann'),
(31, 'Frank Finlay'),
(32, 'Maureen Lipman'),
(33, 'Jamie Foxx'),
(34, 'Christoph Waltz'),
(35, 'Leonardo DiCaprio'),
(36, 'Kerry Washington'),
(37, 'Joaquin Phoenix'),
(38, 'Robert De Niro'),
(39, 'Zazie Beetz'),
(40, 'Frances Conroy'),
(41, 'Helen Hunt'),
(42, 'Chris Noth'),
(43, 'Paul Sanchez'),
(44, 'Dev Patel'),
(45, 'Rooney Mara'),
(46, 'David Wenham'),
(47, 'Nicole Kidman');

INSERT INTO `actor_images` (`id`, `fk_id_actor`, `photo`) VALUES
(1, 1, 'actor_1.jpg'),
(2, 2, 'actor_2.jpg'),
(3, 3, 'actor_3.jpg'),
(4, 4, 'actor_4.jpg'),
(5, 5, 'actor_5.jpg'),
(6, 6, 'actor_6.jpg'),
(7, 7, 'actor_7.jpg'),
(8, 8, 'actor_8.jpg'),
(9, 9, 'actor_9.jpg'),
(10, 10, 'actor_10.jpg'),
(11, 11, 'actor_11.jpg'),
(12, 12, 'actor_12.jpg'),
(13, 13, 'actor_13.jpg'),
(14, 14, 'actor_14.jpg'),
(15, 15, 'actor_15.jpg'),
(16, 16, 'actor_16.jpg'),
(17, 17, 'actor_17.jpg'),
(18, 18, 'actor_18.jpg'),
(19, 19, 'actor_19.jpg'),
(20, 20, 'actor_20.jpg'),
(21, 21, 'actor_21.jpg'),
(22, 22, 'actor_22.jpg'),
(23, 23, 'actor_23.jpg'),
(24, 24, 'actor_24.jpg'),
(25, 25, 'actor_25.jpg'),
(26, 26, 'actor_26.jpg'),
(27, 27, 'actor_27.jpg'),
(28, 28, 'actor_28.jpg'),
(29, 29, 'actor_29.jpg'),
(30, 30, 'actor_30.jpg'),
(31, 31, 'actor_31.jpg'),
(32, 32, 'actor_32.jpg'),
(33, 33, 'actor_33.jpg'),
(34, 34, 'actor_34.jpg'),
(35, 35, 'actor_35.jpg'),
(36, 36, 'actor_36.jpg'),
(37, 37, 'actor_37.jpg'),
(38, 38, 'actor_38.jpg'),
(39, 39, 'actor_39.jpg'),
(40, 40, 'actor_40.jpg'),
(41, 41, 'actor_41.jpg'),
(42, 42, 'actor_42.jpg'),
(43, 43, 'actor_43.jpg'),
(44, 44, 'actor_44.jpg'),
(45, 45, 'actor_45.jpg'),
(46, 46, 'actor_46.jpg'),
(47, 47, 'actor_47.jpg');

INSERT INTO `genres` (`id`, `name`) VALUES
(1, 'Comedy'),
(2, 'Action'),
(3, 'Drama'),
(4, 'Crime'),
(5, 'Thriller'),
(6, 'Romance'),
(7, 'Mystery'),
(8, 'Adventure'),
(9, 'Science Fiction'),
(10, 'War'),
(11, 'Western'),
(12, 'History');

INSERT INTO `movies` (`id`, `title`, `year`, `rating`, `synopsis`, `trailer`, `runtime`) VALUES
(1, 'The Dictator', 2012, 6.4, 'The heroic story of a dictator who risks his life to ensure that democracy would never come to the country he so lovingly oppressed.', 'BegO9nKUsBY', 83),
(2, 'Hacksaw Ridge', 2016, 8.1, 'WWII American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first Conscientious Objector in American history to receive the Congressional Medal of Honor.', 's2-1hz1juBI', 139),
(3, 'The Godfather', 1972, 9.2, 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.', 'Ma1-sIoZnMs', 175),
(4, 'Pulp Fiction', 1994, 8.9, "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.", "tGpTpVyI_OQ", 154),
(5, "Forrest Gump", 1994, 8.8, "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.", 'bLvqoHBptjg', 142),
(6, 'Se7en', 1995, 8.6, "Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the 'seven deadly sins' in this dark and haunting film that takes viewers from the tortured remains of one victim to the next. The seasoned Det. Sommerset researches each sin in an effort to get inside the killer's mind, while his novice partner, Mills, scoffs at his efforts to unravel the case.", "SpKbZ_3zlb0", 127),
(7, 'Interstellar', 2014, 8.6, "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.", '827FNDpQWrQ', 169),
(8, 'The Pianist', 2002, 8.5, "The true story of pianist Władysław Szpilman's experiences in Warsaw during the Nazi occupation. When the Jews of the city find themselves forced into a ghetto, Szpilman finds work playing in a café; and when his family is deported in 1942, he stays behind, works for a while as a laborer, and eventually goes into hiding in the ruins of the war-torn city.", 'u_jE7-6Uv7E', 150),
(9, 'Django Unchained', 2012, 8.4, "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.", 'wH1TSNIYj5E', 165),
(10, 'Joker', 2019, 8.4, "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.", 't433PEQGErc', 122),
(11, 'Cast Away', 2000, 7.8, "Chuck Nolan, a top international manager for FedEx, and Kelly, a Ph.D. student, are in love and heading towards marriage. Then Chuck's plane to Malaysia crashes at sea during a terrible storm. He's the only survivor, and finds himself marooned on a desolate island. With no way to escape, Chuck must find ways to survive in his new home.", '4olwbrY2kwE', 143),
(12, 'Lion', 2016, 8, "A five-year-old Indian boy gets lost on the streets of Calcutta, thousands of kilometers from home. He survives many challenges before being adopted by a couple in Australia; 25 years later, he sets out to find his lost family.", 'xNstK5rbzcw', 118);

INSERT INTO `roles` (`id`, `fk_id_movie`, `fk_id_actor`, `name`) VALUES
(1, 1, 1, 'Aladeen'),
(2, 1, 2, 'Zoey'),
(3, 1, 3, 'Tamir'),
(4, 2, 4, 'Desmond T. Doss'),
(5, 2, 5, 'Captain Glover'),
(6, 2, 6, 'Sergeant Howell'),
(7, 1, 7, 'Nadal'),
(8, 2, 8, 'Dorothy Schuttle'),
(9, 3, 9, "Don Vito Corleone"),
(10, 3, 10, "Don Michael Corleone"),
(11, 3, 11, "Santino 'Sonny' Corleone"),
(12, 3, 12, 'Tom Hagen'),
(13, 4, 13, 'Vincent Vega'),
(14, 4, 14, 'Jules Winnfield'),
(15, 4, 15, 'Mia Wallace'),
(16, 4, 16, 'Butch Coolidge'),
(17, 5, 17, 'Forrest Gump'),
(18, 5, 18, 'Jenny Curran'),
(19, 5, 19, 'Lieutenant Dan Taylor'),
(20, 5, 20, "Benjamin Buford 'Bubba' Blue"),
(21, 6, 21, 'Detective David Mills'),
(22, 6, 22, 'Detective Lt. William Somerset'),
(23, 6, 23, 'Tracy Mills'),
(24, 6, 24, 'Police Captain'),
(25, 7, 25, 'Joseph "Coop" Cooper'),
(26, 7, 26, 'Dr. Amelia Brand'),
(27, 7, 27, 'Murphy "Murph" Cooper'),
(28, 7, 28, 'Young Murph Cooper'),
(29, 8, 29, "Władysław 'Władek' Szpilman"),
(30, 8, 30, 'Captain Wilm Hosenfeld'),
(31, 8, 31, 'Father'),
(32, 8, 32, 'Mother'),
(33, 9, 33, 'Django Freeman'),
(34, 9, 34, 'Dr. King Schultz'),
(35, 9, 35, 'Calvin J. Candie'),
(36, 9, 36, 'Broomhilda von Shaft'),
(37, 10, 37, 'Arthur Fleck / Joker'),
(38, 10, 38, 'Murray Franklin'),
(39, 10, 39, 'Sophie Dumond'),
(40, 10, 40, 'Penny Fleck'),
(41, 11, 17, 'Chuck Noland'),
(42, 11, 41, 'Kelly Frears'),
(43, 11, 42, 'Jerry Lovett'),
(44, 11, 43, 'Ramon'),
(45, 12, 44, 'Saroo Brierley'),
(46, 12, 45, 'Lucy'),
(47, 12, 46, 'John Brierley'),
(48, 12, 47, 'Sue Brierley');

INSERT INTO `movie_genres` (`id`, `fk_id_movie`, `fk_id_genre`) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 2, 10),
(4, 2, 12),
(5, 3, 3),
(6, 3, 4),
(7, 4, 4),
(8, 4, 5),
(9, 5, 1),
(10, 5, 3),
(11, 5, 6),
(12, 6, 4),
(13, 6, 5),
(14, 6, 7),
(15, 7, 3),
(16, 7, 8),
(17, 7, 9),
(18, 8, 3),
(19, 8, 10),
(20, 9, 3),
(21, 9, 11),
(22, 10, 3),
(23, 10, 4),
(24, 10, 5),
(25, 11, 3),
(26, 11, 8),
(27, 12, 3);

INSERT INTO `movie_images` (`id`, `fk_id_movie`, `cover`, `background`) VALUES
(1, 1, 'cover_movie_1.jpg', 'background_movie_1.jpg'),
(2, 2, 'cover_movie_2.jpg', 'background_movie_2.jpg'),
(3, 3, 'cover_movie_3.jpg', 'background_movie_3.jpg'),
(4, 4, 'cover_movie_4.jpg', 'background_movie_4.jpg'),
(5, 5, 'cover_movie_5.jpg', 'background_movie_5.jpg'),
(6, 6, 'cover_movie_6.jpg', 'background_movie_6.jpg'),
(7, 7, 'cover_movie_7.jpg', 'background_movie_7.jpg'),
(8, 8, 'cover_movie_8.jpg', 'background_movie_8.jpg'),
(9, 9, 'cover_movie_9.jpg', 'background_movie_9.jpg'),
(10, 10, 'cover_movie_10.jpg', 'background_movie_10.jpg'),
(11, 11, 'cover_movie_11.jpg', 'background_movie_11.jpg'),
(12, 12, 'cover_movie_12.jpg', 'background_movie_12.jpg');

INSERT INTO `users` (`id`, `type_user`, `password`) VALUES
(1, 1, 'estig');

INSERT INTO `my_lists` (`id`, `fk_id_user`) VALUES
(1, 1);

INSERT INTO `my_list_items` (`id`, `fk_id_movie`, `fk_id_my_list`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 12, 1),
(4, 6, 1),
(5, 4, 1),
(6, 7, 1);


