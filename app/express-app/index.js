require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const cohere = require("cohere-ai");
const https = require("https");
const axios = require("axios");
const PORT = process.env.PORT || 8000;

const attractionsContent = 
`Afghanistan
1. The ancient city of Balkh 
2. The Buddhas of Bamiyan 
3. The Blue Mosque in Mazar-e-Sharif 
4. The Gardens of Babur in Kabul 
5. Band-e-Amir National Park 
6. Minaret of Jam 
7. Istalif pottery village 
8. Paghman Valley 
9. Herat Citadel 
10. Jalalabad's Museum of Archaeology

Albania
1. Albanian Riviera
2. Butrint National Park
3. Berat Castle
4. Shkoder Castle
5. Blue Eye (Syri i Kalter)
6. Kruja Castle
7. Et'hem Bey Mosque
8. Gjirokastra Castle
9. Skanderbeg Square
10. Llogara Pass

Algeria
1. Casbah of Algiers
2. Tassili n'Ajjer National Park
3. Djémila
4. Tipasa
5. Constantine
6. Oran
7. Al Qal'a of Beni Hammad
8. Ghardaïa
9. Timgad
10. Timimoun

Andorra
1. Sant Joan de Caselles Church
2. Vallnord Ski Resort
3. Caldea Spa
4. Grandvalira Ski Resort
5. Casa de la Vall
6. Mirador del Roc del Quer
7. Meritxell Sanctuary
8. Palau de Gel d'Andorra
9. Lake Engolasters
10. Santuario de Nuestra Senora de Meritxell

Angola
1. Kalandula Falls
2. Fortaleza de São Miguel
3. Ilha do Mussulo
4. Iona National Park
5. Cangandala National Park
6. Kissama National Park
7. Miradouro da Lua
8. Namibe Desert
9. Igreja de Nossa Senhora do Populo
10. Sangano Beach

Antigua and Barbuda
1. Nelson's Dockyard National Park
2. Shirley Heights Lookout
3. Devil's Bridge
4. Darkwood Beach
5. Antigua Rainforest Canopy Tour
6. Half Moon Bay
7. Betty's Hope
8. Great Bird Island
9. Antigua and Barbuda Museum
10. St. John's Cathedral

Argentina
1. Iguazu Falls
2. Buenos Aires
3. Perito Moreno Glacier
4. Bariloche
5. Mendoza Wine Region
6. Salta and Jujuy Provinces
7. Colonia del Sacramento (Uruguay)
8. Tierra del Fuego National Park
9. Ushuaia
10. Valdes Peninsula Wildlife Reserve

Armenia
1. Garni Temple
2. Geghard Monastery
3. Tatev Monastery
4. Lake Sevan
5. Dilijan National Park
6. Khor Virap Monastery
7. The Cascade Complex
8. Noravank Monastery
9. Zvartnots Cathedral
10. Erebuni Fortress Museum

Australia
1. Sydney Opera House
2. Great Barrier Reef
3. Uluru (Ayers Rock)
4. Bondi Beach
5. Kangaroo Island
6. Blue Mountains National Park
7. Phillip Island
8. Daintree Rainforest
9. The Great Ocean Road
10. Kakadu National Park

Austria
1. Schönbrunn Palace
2. The Hofburg
3. St. Stephen's Cathedral
4. Mirabell Palace
5. Hohensalzburg Fortress
6. Grossglockner Alpine Road
7. The Spanish Riding School
8. Melk Abbey
9. Wolfgangsee Lake
10. Innsbruck Old Town

Azerbaijan
1. Flame Towers in Baku
2. Heydar Aliyev Center in Baku
3. Old City (Icherisheher) in Baku
4. Mud Volcanoes in Gobustan
5. Shirvanshahs Palace in Baku
6. Yanar Dag Fire Mountain in Yanar Dag
7. Maiden Tower in Baku
8. Gobustan National Park
9. Gabala City Tourist Center
10. Sheki Khans' Palace in Sheki

The Bahamas
1. Atlantis Paradise Island
2. Exuma Cays Land and Sea Park
3. The Andros Barrier Reef
4. Blue Lagoon Island (Salt Cay)
5. Fort Charlotte
6. Lucayan National Park
7. Thunderball Grotto
8. Pirate Museum
9. Cable Beach
10. Junkanoo Beach

Bahrain
1. Bahrain National Museum
2. Al Fateh Grand Mosque
3. Bahrain International Circuit
4. Bahrain Fort
5. Bab Al Bahrain
6. Tree of Life
7. The Avenues Bahrain
8. Beit Al Quran
9. Muharraq Island
10. Qal'at al-Bahrain Site and Museum.

Bangladesh
1. Sundarbans
2. Cox's Bazar
3. Srimangal
4. Sylhet
5. Dhaka
6. Paharpur
7. Lalbagh Fort
8. Rangamati Hill District
9. St. Martin's Island
10. Kuakata Beach

Barbados
1. Harrison's Cave 
2. Crane Beach 
3. Bathsheba Beach 
4. Barbados Wildlife Reserve 
5. St. Nicholas Abbey 
6. Andromeda Botanic Gardens 
7. Mount Gay Visitor Center 
8. Bridgetown 
9. Oistins Fish Fry 
10. Animal Flower Cave

Belarus
1. Brest Fortress
2. Mir Castle
3. Nesvizh Palace
4. Stalin Line Museum
5. National Park "Belovezhskaya Pushcha"
6. Minsk Old Town
7. National Museum of the History of Belarus
8. Dudutki Open Air Museum
9. Gomel Palace and Park Ensemble
10. Lake Naroch

Belgium
1. Atomium
2. Grand Place
3. Bruges
4. Manneken Pis
5. Ghent
6. Antwerp Central Station
7. Waterloo Battlefield
8. Royal Museums of Fine Arts of Belgium
9. Royal Palace of Brussels
10. Cinquantenaire Park

Belize
1. Belize Barrier Reef 
2. Belize City 
3. Great Blue Hole 
4. Caracol Maya Ruins 
5. Caye Caulker 
6. Ambergris Caye 
7. Actun Tunichil Muknal Cave 
8. Xunantunich Maya Ruins 
9. Placencia 
10. Lamanai Archaeological Reserve

Benin
1. The Royal Palace of Abomey
2. Pendjari National Park
3. Ganvie (the Venice of Africa)
4. Ouidah Museum of History
5. The Temple of Pythons
6. Tanougou Falls
7. The Dantokpa Market
8. Porto-Novo Cathedral
9. The National Museum of Benin
10. Fon Museum

Bhutan
1. Tiger's Nest Monastery
2. Punakha Dzong
3. Dochula Pass
4. Haa Valley
5. Buddha Dordenma Statue
6. Phobjikha Valley
7. Chele La Pass
8. Tashichho Dzong
9. National Memorial Chorten
10. Jigme Dorji National Park

Bolivia
1. Salar de Uyuni
2. Tiwanaku
3. Lake Titicaca
4. La Paz
5. Madidi National Park
6. Copacabana
7. Sucre
8. Potosi
9. Toro Toro National Park
10. Jesuit Missions of the Chiquitos.

Bosnia and Herzegovina
1. Old Bridge in Mostar
2. Sarajevo's Bascarsija neighborhood
3. Kravice Waterfalls
4. Blagaj Tekke
5. Stari Grad in Travnik
6. Una National Park
7. Jahorina Ski Resort
8. Vrelo Bosne
9. Pocitelj Fortress
10. Kozara National Park

Botswana
1. The Okavango Delta
2. Chobe National Park
3. Kalahari Desert
4. Moremi Game Reserve
5. Victoria Falls
6. Nxai Pan National Park
7. Makgadikgadi Pans National Park
8. Tsodilo Hills
9. Linyanti Wildlife Reserve
10. Central Kalahari Game Reserve

Brazil
1. Christ the Redeemer Statue 
2. Sugarloaf Mountain 
3. Ipanema Beach 
4. Copacabana Beach 
5. Amazon Rainforest 
6. Salvador de Bahia 
7. Rio Carnival 
8. Fernando de Noronha 
9. Iguaçu Falls 
10. Pantanal Wetlands

Brunei
1. Sultan Omar Ali Saifuddien Mosque
2. Royal Regalia Museum
3. Kampong Ayer Water Village
4. Istana Nurul Iman
5. Jerudong Park Playground
6. Malay Technology Museum
7. Tasek Lama Recreational Park
8. Jame' Asr Hassanil Bolkiah Mosque
9. Brunei Museum and Istana Darussalam
10. Ulu Temburong National Park

Bulgaria
1. Rila Monastery
2. Alexander Nevsky Cathedral
3. Sunny Beach
4. Varna Archaeological Museum
5. Bansko Ski Resort
6. Plovdiv Roman Theatre
7. Veliko Tarnovo Tsarevets Fortress
8. Nessebar Old Town
9. Belogradchik Rocks
10. Madara Rider.

Burkina Faso
1. Ouagadougou Cathedral
2. Bangr-Weogo Urban National Park
3. Laongo Sculpture Symposium
4. Grand Mosque of Bobo-Dioulasso
5. Mare aux Hippopotames Wildlife Reserve
6. National Museum of Music
7. Dô Market
8. Place des Cinéastes
9. Banfora Cascades
10. Nazinga Game Ranch

Burundi
1. Rusizi National Park 
2. Kibira National Park 
3. Source of Nile 
4. Lake Tanganyika 
5. Saga Beach 
6. Gishora Drum Sanctuary 
7. Karera Falls 
8. Chutes de la Kagera 
9. Ruvubu National Park 
10. Burundi Geological Museum.

Cabo Verde
1. Salinas de Pedra de Lume (Salt Flats)
2. Praia de Santa Maria (Santa Maria Beach)
3. Ribeira Grande (Cidade Velha)
4. Terra Boa (Fogo Island)
5. Ponta Do Sol (Santo Antão Island)
6. Monte Verde (Santiago Island)
7. Morro de Areia (Sal Island)
8. Praia de Chaves (Boa Vista Island)
9. Buracona (Sal Island)
10. Monte Gordo (São Nicolau Island)

Cambodia
1. Angkor Wat
2. Bayon Temple
3. Ta Prohm Temple
4. Royal Palace, Phnom Penh
5. Silver Pagoda, Phnom Penh
6. Killing Fields, Phnom Penh
7. Sihanoukville Beaches
8. Bokor Hill Station, Kampot
9. Tonle Sap Lake
10. Preah Vihear Temple

Cameroon
1. Waza National Park
2. Limbe Botanic Garden
3. Mount Cameroon
4. Benoue National Park
5. Kribi Beach
6. Bamenda Market
7. Douala Central Market
8. Foumban Royal Palace Museum
9. Lake Nyos
10. Dja Faunal Reserve

Canada
1. Niagara Falls
2. Banff National Park
3. Toronto CN Tower
4. Quebec City and the Chateau Frontenac
5. Vancouver and Stanley Park
6. Montreal Old City
7. Ottawa Parliament Hill and Buildings
8. Jasper National Park
9. Calgary Stampede
10. Whistler and Blackcomb Mountain Resort

Central African Republic (CAR)
1. Manovo-Gounda St Floris National Park
2. Dzanga-Sangha National Park
3. Bamingui-Bangoran National Park
4. Boali Falls
5. Beloko Mountain
6. Ndélé
7. Kaga-Bandoro
8. Berengo Palace
9. Chutes de la Mambéré
10. Cathedral of Bangui

Chad
1. Zakouma National Park 
2. Lake Chad 
3. N'Djamena Grand Mosque 
4. Ennedi Plateau 
5. Abeche Mosque 
6. Sahr Mountains 
7. Manda National Park 
8. Gaoui Hill 
9. Archei Rock Formations 
10. Tibesti Mountains

Chile
1. Easter Island 
2. Torres del Paine National Park 
3. Atacama Desert 
4. Valparaíso 
5. Santiago 
6. Chiloé Island 
7. Pucon 
8. Marble Caves 
9. La Serena 
10. San Pedro de Atacama

China
1. The Great Wall of China
2. The Forbidden City 
3. The Terracotta Warriors 
4. The Shanghai Bund 
5. The Yangtze River Cruise 
6. The Potala Palace 
7. The Giant Panda Sanctuaries 
8. The Yellow Mountain 
9. The Zhangjiajie National Forest Park 
10. The West Lake in Hangzhou

Colombia
1. Cartagena Old Town
2. Tayrona National Natural Park 
3. Lost City (Ciudad Perdida) 
4. Salt Cathedral of Zipaquirá 
5. Coffee Cultural Landscape of Colombia 
6. Bogotá's Gold Museum (Museo del Oro) 
7. Cocora Valley 
8. San Agustín Archaeological Park 
9. Medellín's Comuna 13 
10. La Ciudadela Market in Cartagena

Comoros
1. Mount Karthala
2. Lac Sale
3. Mosquée de Vendredi
4. Chindini Beach
5. Itsandra Beach
6. Dziani Boundouni
7. Mutsamudu Market
8. Domoni Mosque
9. Chouani Beach
10. Coelacanth Marine Park

Democratic Republic of the Congo
1. Virunga National Park
2. Lola Ya Bonobo
3. Okapi Wildlife Reserve
4. Mount Nyiragongo
5. Kahuzi-Biega National Park
6. Maiko National Park
7. Salonga National Park
8. Livingstone Falls
9. Kinshasa National Museum
10. Kisantu Botanical Gardens.

Republic of the Congo
1. Virunga National Park
2. Odzala-Kokoua National Park
3. Lesio-Louna Natural Reserve
4. Nouabale-Ndoki National Park
5. Marais Alphose Moubanga
6. Basilique Sainte-Anne
7. Brazzaville Art Market
8. Palace of the People
9. Cathédrale du Sacré-Coeur
10. Congolese National Museum

Costa Rica
1. Arenal Volcano National Park
2. Manuel Antonio National Park
3. Monteverde Cloud Forest Reserve
4. Tortuguero National Park
5. Corcovado National Park
6. La Fortuna Waterfall
7. Tamarindo Beach
8. Poas Volcano National Park
9. Jaco Beach
10. Rincon de la Vieja National Park

Cote d'Ivoire
1. Basilica of Our Lady of Peace
2. Mount Nimba Strict Nature Reserve
3. Comoe National Park
4. Tai National Park
5. St. Paul's Cathedral
6. The Plateau district of Abidjan
7. The beaches of Grand-Bassam
8. The colonial city of Grand-Bassam
9. The town of Bouake
10. The Palace of Culture in Abidjan

Croatia
1. Dubrovnik Old Town
2. Plitvice Lakes National Park
3. Diocletian's Palace, Split
4. Hvar Island
5. Zagreb Old City
6. Pula Arena
7. Krka National Park
8. Zlatni Rat Beach, Brac Island
9. Trakošćan Castle
10. Rovinj Town

Cuba
1. Old Havana
2. Varadero Beach
3. Trinidad
4. Viñales Valley
5. Santa Clara
6. Cienfuegos
7. El Malecon
8. Santiago de Cuba
9. Morro Castle
10. Bay of Pigs

Cyprus
1. Petra tou Romiou (Aphrodite's Rock)
2. Old town of Nicosia
3. Tombs of the Kings
4. Limassol Marina
5. Cape Greco National Forest Park
6. Kykkos Monastery
7. Paphos Archaeological Park
8. Fig Tree Bay
9. Larnaca Salt Lake
10. Troodos Mountains.

Czech Republic (Czechia)
1. Charles Bridge, Prague
2. Prague Castle, Prague
3. Old Town Square, Prague
4. St. Vitus Cathedral, Prague Castle, Prague
5. Karlštejn Castle, Karlštejn
6. Cesky Krumlov Castle, Cesky Krumlov
7. Sedlec Ossuary, Kutna Hora
8. Telc Historic Center, Telc
9. Pilsner Urquell Brewery, Pilsen
10. Terezin Memorial, Terezin

Denmark
1. Tivoli Gardens 
2. The Little Mermaid statue 
3. Legoland Billund 
4. Nyhavn Harbor 
5. Rosenborg Castle 
6. Viking Ship Museum 
7. Frederiksborg Castle 
8. Aarhus Old Town 
9. Amalienborg Palace 
10. National Museum of Denmark

Djibouti
1. Lake Assal
2. Lake Abbe 
3. Day Forest National Park
4. Moucha Island 
5. Presidential Palace 
6. Maskali Island 
7. Central Market 
8. Plateau du Serpent 
9. Hamdoud Beach 
10. Ethnographic Museum

Dominica
1. Morne Trois Pitons National Park
2. Trafalgar Falls
3. Boiling Lake
4. Champagne Reef
5. Indian River
6. Emerald Pool
7. Scotts Head
8. Waitukubuli National Trail
9. Kalinago Territory
10. Roseau Market

Dominican Republic
1. Punta Cana Beach
2. Santo Domingo's Colonial Zone
3. Saona Island
4. Los Haitises National Park
5. El Limón Waterfall
6. Altos de Chavón
7. Samaná Bay
8. Catalina Island
9. Las Terrenas
10. Jarabacoa

Ecuador
1. Galapagos Islands
2. Quito Old Town
3. Otavalo Market
4. Chimborazo
5. Cuenca City
6. Baños de Agua Santa
7. Mindo Cloud Forest
8. Cotopaxi
9. Puerto Lopez Beach
10. Guayaquil City

Egypt
1. Pyramids of Giza
2. Valley of the Kings
3. Abu Simbel
4. Karnak Temple
5. Luxor Temple
6. Cairo Citadel
7. Egyptian Museum
8. Aswan High Dam
9. White Desert
10. Alexandria Lighthouse (Pharos)

El Salvador
1. San Salvador Cathedral
2. Joya de Cerén Archaeological Site
3. Tazumal Archaeological Site
4. Lake Coatepeque
5. Santa Ana Volcano
6. El Boquerón National Park
7. Los Tercios Waterfall
8. Ruta de las Flores (Route of the Flowers)
9. Suchitoto Colonial Town
10. La Libertad Beaches

Equatorial Guinea
1. Malabo
2. Monte Alen National Park
3. Pico Basile National Park
4. Santa Isabel
5. Annobon Island
6. Bata
7. Moca Valley
8. Ciudad de la Paz
9. Corisco Island
10. Luba

Eritrea
1. Asmara Central Market
2. Dahlak Archipelago
3. Asmara Opera House
4. Imperial Palace of Asmara
5. National Museum of Eritrea
6. Church of Our Lady of the Rosary
7. Adulis Archaeological Site
8. Mai Nefhi Monastery
9. Semenawi Bahri National Park
10. Dankalia Region's Salt Pans

Estonia
1. Tallinn Old Town
2. Lahemaa National Park
3. Toompea Castle
4. Alexander Nevsky Cathedral
5. Kadriorg Palace and Park
6. Pärnu Beach
7. Setomaa Cultural Region
8. Peipus Lake
9. Estonian Open Air Museum
10. Kumu Art Museum

Eswatini (formerly Swaziland)
1. Hlane Royal National Park
2. Mlilwane Wildlife Sanctuary
3. Ezulwini Valley
4. Mantenga Cultural Village
5. Mbabane Market
6. Maguga Dam
7. Nsangwini Rock Art
8. Phophonyane Falls Nature Reserve
9. Malolotja Nature Reserve
10. Sibebe Rock

Ethiopia
1. Lalibela
2. Simien Mountains National Park
3. Danakil Depression
4. Axum
5. Lake Tana
6. Sof Omar Cave
7. Harar Jugol
8. Bale Mountains National Park
9. Gondar
10. Blue Nile Falls

Fiji
1. Yasawa Islands
2. Mamanuca Islands
3. Sigatoka Sand Dunes National Park
4. Taveuni Island
5. Bouma National Heritage Park
6. Sabeto Hot Springs and Mud Pool
7. Colo-I-Suva Forest Park
8. Garden of the Sleeping Giant
9. Nadi Markets
10. Fiji Museum

Finland
1. Helsinki Cathedral
2. Santa Claus Village
3. Suomenlinna Island
4. Rovaniemi
5. Nuuksio National Park
6. Levi Ski Resort
7. Turku Castle
8. Koli National Park
9. Saimaa Lakes
10. Porvoo Old Town

France
1. Eiffel Tower
2. Louvre Museum
3. Palace of Versailles
4. Notre-Dame Cathedral
5. Mont Saint-Michel
6. Château de Chambord
7. Strasbourg Cathedral
8. Sainte-Chapelle
9. Luberon Regional Nature Park
10. Pont du Gard

Gabon
1. Loango National Park
2. Pongara National Park
3. Lope National Park
4. St. Michael's Cathedral
5. Musée National des Arts et Traditions du Gabon
6. Pointe-Denis Beach
7. Marché du Mont-Bouët
8. Fondation Jean-Paul II
9. Iguéla Lagoon
10. Crystal Mountains National Park

Gambia
1. Kachikally Crocodile Pool
2. Bijilo Forest Park
3. Abuko Nature Reserve
4. National Museum of the Gambia
5. Tanji Fish Market
6. Gunjur Beach
7. Sanyang Beach
8. Wassu Stone Circles
9. Arch 22
10. Albert Market

Georgia
1. Savannah Historic District
2. Martin Luther King Jr. National Historic Site - Atlanta
3. Georgia Aquarium - Atlanta
4. Stone Mountain Park - Stone Mountain
5. World of Coca-Cola - Atlanta
6. Jekyll Island - Jekyll Island
7. Tallulah Gorge State Park - Tallulah Falls
8. Forsyth Park - Savannah
9. Callaway Gardens - Pine Mountain
10. Tybee Island - Tybee Island

Germany
1. Neuschwanstein Castle 
2. Brandenburg Gate 
3. Cologne Cathedral 
4. Oktoberfest 
5. Berlin Wall 
6. Romantic Road 
7. Heidelberg Castle 
8. Black Forest 
9. Zugspitze 
10. Neanderthal Museum

Ghana
1. Kakum National Park
2. Cape Coast Castle
3. Lake Volta
4. Mole National Park
5. Labadi Beach
6. Kumasi Central Market
7. Wli Waterfalls
8. Aburi Botanical Gardens
9. Elmina Castle
10. Osu Castle

Greece
1. Acropolis of Athens
2. Santorini
3. Mykonos
4. Delphi
5. Mount Olympus
6. Meteora
7. Rhodes Old Town
8. Samaria Gorge
9. Nafplio
10. Crete’s Archaeological Sites

Grenada
1. Grand Anse Beach
2. Fort George
3. St. George's Market Square
4. Annandale Waterfall
5. Concord Falls
6. Lake Antoine National Park
7. Grenada National Museum
8. Grenada Underwater Sculpture Park
9. Levera National Park
10. Carriacou Island.

Guatemala
1. Tikal National Park
2. Antigua Guatemala
3. Lake Atitlan
4. Semuc Champey
5. Chichicastenango Market
6. Pacaya Volcano
7. Castillo de San Felipe de Lara
8. Quetzaltenango
9. Livingston
10. Rio Dulce National Park

Guinea
as I am an AI language model and do not have personal views or opinions. 

1. The Fouta Djallon Highlands
2. Conakry Grand Mosque
3. National Museum of Guinea
4. Forts and Castles of Guinea
5. Les Cascades de la Soumba
6. Mount Nimba Strict Nature Reserve
7. Pamelap Centre Artisanal
8. Iles de Los National Park
9. Botanical Garden of Guinea
10. Nimba Mountains

Guinea-Bissau
1. Bissau City Market
2. Bubaque Island
3. Bolama Island
4. Cacheu Historic Center
5. Cantanhez Forest National Park
6. Orango Island
7. Bijagos Archipelago
8. Fortaleza d'Amura
9. The Guinea-Bissau National Museum
10. Varela Beach.

Guyana
1. Kaieteur Falls
2. Shell Beach
3. Iwokrama Forest
4. St. George's Cathedral
5. Georgetown UNESCO World Heritage Site
6. Rupununi Savanna
7. Mount Roraima
8. Arrowpoint Nature Resort
9. Kanuku Mountains
10. Karanambu Lodge

Haiti
1. Labadee Beach
2. Sans-Souci Palace
3. Citadelle Laferrière
4. National Museum of Haiti
5. Bassin-Bleu
6. Parc National La Visite
7. Iron Market (Marché en Fer)
8. Barbancourt Rum Distillery
9. Cathedral Notre-Dame of Cap Haitien
10. Port-au-Prince Carnival (held annually in February)

Honduras
1. Copán Ruins
2. Roatán Island
3. Bay Islands
4. La Tigra National Park
5. Punta Sal National Park
6. Cusuco National Park
7. Santa Barbara Cloud Forest
8. Tela Beaches
9. Gracias Fortaleza 
10. Yojoa Lake

Hungary
1. Buda Castle
2. Fisherman's Bastion
3. Hungarian Parliament Building
4. Széchenyi Thermal Bath
5. St. Stephen's Basilica
6. Heroes' Square
7. Matthias Church
8. Gellért Hill
9. Danube Promenade
10. Great Market Hall

Iceland
1. The Blue Lagoon
2. The Golden Circle
3. Reykjavik
4. Vatnajokull Glacier
5. Jokulsarlon Glacier Lagoon
6. Thingvellir National Park
7. Akureyri
8. Myvatn Lake
9. Gullfoss waterfall
10. Seljalandsfoss waterfall

India
1. Taj Mahal
2. Amber Fort
3. Varanasi Ghats
4. Golden Temple
5. Red Fort
6. Jaipur's City Palace
7. Humayun's Tomb
8. Konark Sun Temple
9. Khajuraho Temples
10. Bandhavgarh National Park

Indonesia
1. Bali
2. Borobudur Temple
3. Gili Islands
4. Mount Bromo
5. Komodo National Park
6. Lake Toba
7. Raja Ampat Islands
8. Ubud
9. Tanah Lot Temple
10. Yogyakarta

Iran
1. Persepolis
2. Naqsh-e Jahan Square
3. Imam Reza Shrine
4. Golestan Palace
5. Yazd Historic City
6. Tabriz Historic Bazaar Complex
7. Masjed-e Shah
8. Shah Cheragh
9. Vank Cathedral
10. Mount Damavand

Iraq
1. Al-Mutanabbi Statue
2. The Ziggurat of Ur
3. The Great Arch of Ctesiphon
4. The Hanging Gardens of Babylon
5. The Erbil Citadel
6. The Al'Mahaweel Waterfalls
7. The Tomb of Prophet Jonah
8. The Arbil Grand Mosque
9. Al-Hasan al-Basri Mosque
10. The Samarra Citadel

Ireland
1. Cliffs of Moher
2. Guinness Storehouse
3. Ring of Kerry
4. Dublin Castle
5. Blarney Castle
6. Giant's Causeway
7. Killarney National Park
8. The Burren
9. Trinity College Dublin
10. Kylemore Abbey

Israel
1. Western Wall
2. Old City of Jerusalem
3. Masada National Park
4. Dead Sea
5. Tel Aviv Beaches
6. Yad Vashem Holocaust Memorial Museum
7. Bahai Gardens in Haifa
8. Sea of Galilee
9. Caesarea National Park
10. Mount of Olives

Italy
1. The Colosseum in Rome
2. The canals of Venice
3. The Leaning Tower of Pisa
4. The Vatican City in Rome
5. The ruins of Pompeii
6. The Duomo in Florence
7. The Amalfi Coast
8. Lake Como
9. The Cinque Terre coastline
10. The Galleria degli Uffizi in Florence

Jamaica
1. Dunn's River Falls
2. Bob Marley Museum
3. Rose Hall Great House
4. Rick's Cafe
5. Blue Hole Mineral Spring
6. Doctor's Cave Beach
7. Mystic Mountain
8. Green Grotto Caves
9. Port Antonio
10. Reach Falls

Japan
1. Tokyo Disneyland
2. Mount Fuji
3. Tokyo Tower
4. Kyoto's Kiyomizu-dera Temple
5. Hiroshima Peace Memorial Park
6. Golden Pavilion (Kinkaku-ji), Kyoto
7. Tokyo Skytree
8. Osaka Castle
9. Nara's Todai-ji Temple
10. Himeji Castle

Jordan
1. Petra
2. Wadi Rum
3. Dead Sea
4. Amman Citadel
5. Jerash
6. Ma'in Hot Springs
7. Aqaba
8. Mount Nebo
9. Ajloun Castle
10. Dana Biosphere Reserve

Kazakhstan
1. Baikonur Cosmodrome
2. Charyn Canyon
3. Lake Kaindy
4. Palace of Peace and Reconciliation
5. Medeu Ice Skating Rink
6. Big Almaty Lake
7. Khan Shatyr Entertainment Center
8. Mausoleum of Khoja Ahmed Yasawi
9. Tamgaly Petroglyphs
10. Central State Museum of Kazakhstan

Kenya
1. Masai Mara National Reserve
2. Amboseli National Park
3. Tsavo National Park
4. Mount Kenya
5. Lake Nakuru National Park
6. Lamu Island
7. Mombasa Beaches
8. Nairobi National Museum
9. Samburu National Reserve
10. Hells Gate National Park

Kiribati
1. The Phoenix Islands Protected Area
2. Christmas Island (Kiritimati)
3. The Equator Line
4. Tarawa Atoll
5. Abaiang Atoll
6. Abemama Atoll
7. Aranuka Atoll
8. Betio WWII Museum
9. Maiana Atoll
10. Butaritari Atoll

Kosovo
1. Patriarchate of Peć
2. Visoki Dečani Monastery
3. Rugova Canyon
4. Gračanica Monastery
5. Gadime Cave
6. Germia Park
7. Ethnographic Museum of Kosovo
8. Old Town of Prizren
9. Heroinat Memorial Park
10. Mirusha Waterfalls

Kuwait
1. Kuwait Towers
2. The Grand Mosque
3. Failaka Island
4. Souq Al Mubarakiya
5. The Liberation Tower
6. Scientific Center
7. Tareq Rajab Museum
8. Dhow Harbour
9. Al Shaheed Park
10. Marina Crescent

Kyrgyzstan
1. Ala-Archa National Park
2. Issyk-Kul Lake
3. Burana Tower
4. Osh Bazaar
5. Sary-Chelek Lake
6. Sulaiman-Too Sacred Mountain
7. Tash Rabat Caravanserai
8. Jeti-Oguz Canyon
9. Manas Ordo
10. Altyn Arashan Hot Springs

Laos
1. Luang Prabang
2. Kuang Si Falls
3. Plain of Jars
4. Vientiane
5. Wat Phou
6. Si Phan Don (4000 Islands)
7. Pha That Luang
8. Pak Ou Caves
9. Bolaven Plateau
10. Mekong River Cruise.

Latvia
1. Old Town Riga
2. Rundale Palace
3. Gauja National Park
4. Jurmala Beach
5. Sigulda Castle
6. Turaida Castle
7. Ķemeri National Park
8. Latvian Ethnographic Open-Air Museum
9. Līgatne Nature Trails
10. Cesis Medieval Castle

Lebanon
1. Beirut Downtown
2. Jeita Grotto
3. Raouche Rocks
4. Byblos
5. Harissa
6. Tyre
7. The National Museum of Beirut
8. Qadisha Valley
9. Beiteddine Palace
10. Our Lady of Lebanon

Lesotho
1. The Maletsunyane Falls
2. Katse Dam
3. Thaba Bosiu Cultural Village
4. Ts'ehlanyane National Park
5. Hlotse Mosque
6. Morija Museum and Archives
7. Sehlabathebe National Park
8. Maeder House Gallery
9. Bokong Nature Reserve
10. Lesotho Craft Center

Liberia
1. Sapo National Park
2. Mount Nimba Strict Nature Reserve
3. Providence Island
4. Kpatawee Waterfall
5. Lake Piso
6. Blue Lake
7. CeCe Beach
8. Ducor Palace Hotel
9. John F. Kennedy Memorial Monument
10. Whipple Hill.

Libya
1. Leptis Magna
2. Sabratha
3. Ghadames
4. Cyrene
5. Benghazi
6. Tripoli
7. The Sahara Desert
8. The Green Mountain
9. The Jamahiriya Museum
10. The Red Castle Museum

Liechtenstein
1. Vaduz Castle
2. Kunstmuseum Liechtenstein
3. The Principality of Liechtenstein Trail
4. Postage Stamp Museum
5. Malbun Ski Resort
6. Liechtenstein National Museum
7. Gutenberg Castle
8. Triesenberg Trail System
9. Gaflei Trail System
10. St. Florin Cathedral

Lithuania
1. Hill of Crosses
2. Vilnius Old Town
3. Trakai Castle
4. Curonian Spit
5. Kaunas Old Town
6. Palanga Amber Museum
7. Pazaislis Monastery
8. Aukstaitija National Park
9. Gediminas Castle Tower
10. Dzukija National Park

Luxembourg
1. Casemates du Bock
2. Luxembourg City History Museum
3. Notre-Dame Cathedral
4. Grand Ducal Palace
5. Place d'Armes
6. Petrusse Casemates
7. Adolphe Bridge
8. Mudam Luxembourg – Musée d'Art Moderne Grand-Duc Jean
9. Ponte Vecchio
10. Pfaffenthal Lift

Madagascar
1. Avenue of the Baobabs
2. Andasibe-Mantadia National Park
3. Tsingy de Bemaraha Strict Nature Reserve
4. Ranomafana National Park
5. Masoala National Park
6. Isalo National Park
7. Nosy Be Island
8. Royal Hill of Ambohimanga
9. The Lemur Park
10. Ankarafantsika National Park.

Malawi
1. Lake Malawi
2. Liwonde National Park
3. Majete Wildlife Reserve
4. Mulanje Mountain
5. Nkhata Bay
6. Likoma Island
7. Chongoni Rock Art Area
8. Zomba Plateau
9. Cape Maclear
10. Nyika National Park

Malaysia
1. Petronas Twin Towers
2. Batu Caves
3. Langkawi Island
4. Melaka Historic City
5. Sepilok Orangutan Sanctuary
6. Taman Negara National Park
7. Cameron Highlands
8. Bukit Bintang in Kuala Lumpur
9. Penang Hill
10. Kinabalu Park

Maldives
1. Male City
2. National Museum
3. Hukuru Miskiy Mosque
4. Artificial Beach
5. Maafushi Island
6. Veligandu Island Beach
7. Sun Island Beach
8. Alimatha Island
9. Manta Point
10. Fish Head Dive Site

Mali
1. Djenné- Djeno
2. Timbuktu
3. The Great Mosque of Djenné
4. Dogon Country
5. The National Museum of Mali
6. Segou
7. Tomb of Askia
8. Bamako
9. The Bandiagara Escarpment
10. Hippopotamus Pool of Mopti

Malta
1. Valletta
2. Blue Lagoon
3. Mdina
4. St. John's Co-Cathedral
5. The Hypogeum of Hal-Saflieni
6. Marsaxlokk
7. The Three Cities (Vittoriosa, Senglea and Cospicua)
8. Hagar Qim and Mnajdra Megalithic Temples
9. Gozo Island
10. Popeye Village Malta

Marshall Islands
1. Bikini Atoll Nuclear Test Site
2. Laura Beach Park
3. Alele Museum and Library
4. Majuro Bridge
5. Majuro Cathedral
6. Eneko Island
7. Likiep Atoll
8. Arno Atoll
9. Jaluit Atoll
10. Kwajalein Atoll.

Mauritania
1. Banc d'Arguin National Park
2. Nouakchott Fish Market
3. Terjit Oasis
4. Atar Market
5. Chinguetti Mosque
6. Ksar of Azougui
7. Guelb er Richat
8. Ouadane City
9. Tichit Ancient Town
10. Port de Peche de Nouadhibou.

Mauritius
1. Trou aux Cerfs
2. Black River Gorges National Park
3. Chamarel Waterfall
4. Le Morne Brabant
5. Pamplemousses Botanical Garden
6. Port Louis Central Market
7. Île aux Aigrettes Nature Reserve
8. Grand Bassin (Ganga Talao)
9. Flic en Flac Beach
10. La Vanille Nature Park

Mexico
1. Chichen Itza
2. Tulum
3. Cancun
4. Playa del Carmen
5. Puerto Vallarta
6. Cozumel
7. Cabo San Lucas
8. Riviera Maya
9. Guanajuato City
10. Mexico City

Micronesia
1. Nan Madol
2. Pohnpei Island
3. Kosrae Island
4. Truk Lagoon
5. Yap Island
6. Chuuk Island
7. Outer Islands of Chuuk
8. Sokehs Ridge
9. Lele Ruins
10. German Colonial Buildings in Kolonia

Moldova
1. National Museum of History of Moldova
2. Cricova Winery
3. Orheiul Vechi Monastery
4. National Park "Stefan cel Mare"
5. Capriana Monastery
6. Milestii Mici Winery
7. Pushkin Museum
8. National Palace
9. Chisinau City Hall
10. Stephen the Great Monument

Monaco
1. Casino Monte-Carlo
2. Prince's Palace of Monaco
3. Oceanographic Museum of Monaco
4. Japanese Garden
5. Saint Nicholas Cathedral
6. Monaco Grand Prix Circuit
7. Larvotto Beach
8. Monaco Harbour
9. Exotic Garden of Monaco
10. Fort Antoine Theatre

Mongolia
1. Gobi Desert
2. Erdene Zuu Monastery
3. Khustain Nuruu National Park
4. Terelj National Park
5. Altai Mountains
6. Orkhon Valley Cultural Landscape 
7. Flaming Cliffs 
8. Amarbayasgalant Monastery 
9. Ulgii town
10. Choijin Lama Temple Museum.

Montenegro
1. Kotor Old Town
2. Durmitor National Park
3. Sveti Stefan Island
4. Skadar Lake National Park
5. Lovcen National Park
6. Ostrog Monastery
7. Biogradska Gora National Park
8. Tara River Canyon
9. Rijeka Crnojevica
10. Ada Bojana Beach

Morocco
1. Marrakech
2. Fes Medina
3. Jardin Majorelle
4. Hassan II Mosque
5. Chefchaouen
6. Todgha Gorge
7. Ait Benhaddou
8. Ouzoud Waterfalls
9. The Sahara Desert
10. Essaouira

Mozambique
1. Bazaruto Archipelago
2. Gorongosa National Park
3. Island of Mozambique
4. Quirimbas Archipelago
5. Maputo Special Reserve
6. Nampula Province
7. Niassa Reserve
8. Pemba
9. Inhambane
10. Vilanculos

Myanmar (formerly Burma)
1. Bagan
2. Inle Lake
3. Shwedagon Pagoda
4. Mandalay Hill
5. Kyaiktiyo Pagoda (Golden Rock)
6. Yangon Circular Train
7. Mahamuni Pagoda
8. Ngapali beach
9. Mount Popa
10. Ananda Temple

Namibia
1. Etosha National Park
2. Sossusvlei Sand Dunes
3. Skeleton Coast
4. Fish River Canyon
5. Cape Cross Seal Reserve
6. Swakopmund
7. Himba Village
8. Damaraland
9. Epupa Falls
10. Twyfelfontein rock engravings.

Nauru
1. Anibare Bay
2. Moqua Caves
3. Buada Lagoon
4. Command Ridge
5. Nauru Museum
6. Denigomodu District
7. Moqua Well
8. Parliament House
9. Nibok District
10. Nauru Veterans Memorial

Nepal
1. Mount Everest
2. Boudhanath Stupa
3. Pashupatinath Temple
4. Swayambhunath Temple
5. Kathmandu Durbar Square
6. Patan Durbar Square
7. Bhaktapur Durbar Square
8. Annapurna Base Camp Trek
9. Chitwan National Park
10. Pokhara Lakeside

Netherlands
1. Rijksmuseum 
2. Van Gogh Museum 
3. Anne Frank House 
4. Keukenhof 
5. Amsterdam Canal Ring 
6. Zaanse Schans 
7. The Hague 
8. Delft 
9. Rotterdam 
10. Maastricht.

New Zealand
1. Milford Sound 
2. Tongariro Alpine Crossing 
3. Fiordland National Park 
4. Bay of Islands 
5. Queenstown 
6. Waitomo Glowworm Caves 
7. Abel Tasman National Park 
8. Rotorua 
9. Mount Cook National Park 
10. Auckland's Sky Tower

Nicaragua
1. Granada
2. Masaya Volcano National Park
3. Ometepe Island
4. Corn Islands
5. Mombacho Volcano
6. Leon Cathedral
7. Laguna de Apoyo
8. San Juan del Sur
9. Isla de Zapatera
10. Catedral de Managua

Niger
1. Agadez Grand Mosque
2. W National Park
3. Air and Ténéré Natural Reserve
4. Agadez Old Town
5. Zinder Grand Mosque
6. Sultan's Palace in Zinder
7. City Gate of Zinder
8. Diffa Grand Mosque
9. Diffa Market
10. National Museum of Niger

Nigeria
1. Zuma Rock
2. Idanre Hills
3. Yankari National Park 
4. Olumo Rock 
5. Sukur Cultural Landscape 
6. Ogbunike Caves 
7. Kajuru Castle 
8. Nike Art Gallery 
9. Nike Lake Resort 
10. Tarkwa Bay Beach.

North Korea
1. Kumsusan Palace of the Sun
2. Juche Tower
3. Mount Paektu
4. Tomb of King Kongmin
5. Pyongyang Metro
6. Arch of Triumph
7. Moranbong Park
8. Mansu Hill Grand Monument
9. Ryonggong Residence
10. Mangyongdae Native House.

North Macedonia (formerly Macedonia)
1. Lake Ohrid
2. Matka Canyon
3. Skopje Old Bazaar
4. St. Naum Monastery
5. Skopje City Museum
6. Pelister National Park
7. Markovi Kuli
8. Mavrovo National Park
9. Kokino Observatory
10. Dobro Pole Battlefield Museum and Memorial.

Norway
1. Oslo
2. Bergen
3. Geirangerfjord
4. Tromsø
5. Preikestolen
6. Lofoten Islands
7. Flåm Railway
8. Jostedalsbreen Glacier
9. Viking Ship Museum
10. North Cape (Nordkapp)

Oman
1. Sultan Qaboos Grand Mosque
2. Muttrah Souq
3. Jabal Shams
4. Wahiba Sands
5. Nizwa Fort
6. Bimmah Sinkhole
7. Wadi Shab
8. Royal Opera House Muscat
9. Al Alam Palace
10. Ras Al Jinz Turtle Reserve

Pakistan
1. Badshahi Mosque
2. Lahore Fort
3. Faisal Mosque
4. Shalimar Gardens
5. Mohenjo-Daro
6. Rohtas Fort
7. Hunza Valley
8. Lake Saif ul Malook
9. Minar-e-Pakistan
10. K2 Mountain Peak

Palau
1. Rock Islands
2. Jellyfish Lake
3. Ngardmau Waterfall
4. Bat Caves
5. Belau National Museum
6. Palau International Coral Reef Center
7. Ngarchelong Ancient Village
8. Ngatpang Coral Gardens
9. WCTC Shopping Center
10. Palau Pacific Resort Beach.

Palestine
1. Old City of Jerusalem
2. Church of the Nativity, Bethlehem
3. Dome of the Rock, Jerusalem
4. Masjid Al-Aqsa, Jerusalem
5. Mount of Olives, Jerusalem
6. Herodion National Park, Beit Sahur
7. Hebron Old City
8. The Dead Sea, West Bank
9. St. George's Monastery, Wadi Qelt
10. Jericho, West Bank

Panama
1. Panama Canal 
2. Casco Viejo 
3. San Blas Islands 
4. Bocas del Toro 
5. Panama Viejo 
6. Amador Causeway 
7. Gulf of Chiriqui Marine National Park 
8. Volcan Baru 
9. Biomuseo 
10. Isla Taboga

Papua New Guinea
1. Kokoda Track
2. Port Moresby Nature Park
3. Tufi Resort
4. Rabaul War Cemetery
5. National Museum and Art Gallery
6. Asaro Mudmen Village
7. Sepik River
8. Mt. Wilhelm
9. Loloata Island
10. Kimbe Bay Wildlife Sanctuary.

Paraguay
1. Itaipu Dam
2. Jesuit Missions of La Santísima Trinidad de Paraná and Jesús de Tavarangue
3. Ybycuí National Park
4. Encarnación Carnival
5. Asunción Cathedral
6. Cerro Cora National Park
7. San Cosme y Damián Ruins
8. Chaco Culture National Historical Park
9. The National Pantheon of the Heroes
10. Museum of Fine Arts in Asunción

Peru
1. Machu Picchu
2. Cusco
3. Lake Titicaca
4. The Nazca Lines
5. The Colca Canyon
6. The Amazon Rainforest
7. The Sacred Valley
8. Lima
9. Huacachina Oasis
10. The Peruvian Andes

Philippines
1. Boracay
2. Palawan
3. Chocolate Hills
4. Mayon Volcano
5. Tubbataha Reef
6. Puerto Princesa Subterranean River National Park
7. White Beach, Puerto Galera
8. Hundred Islands
9. Intramuros
10. Banaue Rice Terraces.

Poland
1. Wawel Castle 
2. Auschwitz-Birkenau 
3. Kraków Old Town 
4. Masurian Lakes 
5. Tatra Mountains 
6. Malbork Castle 
7. Bialowieza Forest 
8. Gdansk Old Town 
9. Zakopane 
10. Wieliczka Salt Mine

Portugal
1. Lisbon
2. Porto
3. Algarve
4. Sintra
5. Madeira
6. Évora
7. Coimbra
8. Guimarães
9. Fatima
10. Douro Valley

Qatar
1. The Pearl-Qatar
2. Souq Waqif
3. Museum of Islamic Art
4. Katara Cultural Village
5. Aspire Park
6. Sheikh Faisal Bin Qassim Al Thani Museum
7. Doha Corniche
8. Al Zubarah Archaeological Site
9. Al Khor Wildlife Park
10. Al Wakra Museum

Romania
1. Bran Castle
2. Palace of the Parliament (Palatul Parlamentului)
3. Peles Castle
4. Merry Cemetery (Cimitirul Vesel)
5. Corvin Castle (Castelul Corvinilor)
6. Salina Turda (Turda Salt Mine)
7. Painted Monasteries of Bucovina (Mănăstirile pictate din Bucovina)
8. Sinaia Monastery (Mănăstirea Sinaia)
9. Transfagarasan Highway (Drumul Transfagarasan)
10. Danube Delta (Delta Dunării)

Russia
1. Red Square and St. Basil's Cathedral, Moscow
2. Hermitage Museum, St. Petersburg
3. Peterhof Palace and Gardens, St. Petersburg
4. Bolshoi Theater, Moscow
5. Cathedral of the Savior on Spilled Blood, St. Petersburg
6. Kazan Kremlin, Kazan
7. Lake Baikal, Siberia
8. Kizhi Island, Karelia
9. Peter and Paul Fortress, St. Petersburg
10. Gorky Park, Moscow

Rwanda
1. Volcanoes National Park
2. Lake Kivu
3. Nyungwe National Park
4. Kigali Genocide Memorial
5. Akagera National Park
6. Inema Art Center
7. Ethnographic Museum of Rwanda
8. Nyanza Genocide Memorial
9. Gisenyi Beach
10. Musanze Caves

Saint Kitts and Nevis
1. Brimstone Hill Fortress National Park
2. Mount Liamuiga
3. Pinney's Beach
4. Cockleshell Beach
5. Nevis Peak
6. Caribelle Batik
7. Timothy Hill
8. Basseterre
9. St. Kitts Scenic Railway
10. Frigate Bay Beach

Saint Lucia
1. The Pitons
2. Sulphur Springs
3. Diamond Falls Botanical Gardens
4. Pigeon Island National Park
5. Marigot Bay
6. Anse Chastanet beach
7. Rodney Bay Marina
8. Gros Islet Friday Night Street Party
9. Tet Paul Nature Trail
10. Morne Fortune Historical Area

Saint Vincent and the Grenadines
1. Tobago Cays Marine Park
2. Bequia
3. Botanic Gardens
4. St. Vincent and the Grenadines National Park
5. Princess Margaret Beach
6. Mopion Island
7. Fort Charlotte
8. Dark View Falls
9. Owia Salt Pond
10. Wallilabou Bay

Samoa
1. Piula Cave Pool
2. To Sua Ocean Trench
3. Alofaaga Blowholes
4. Papaseea Sliding Rocks
5. Lalomanu Beach
6. Giant Clam Sanctuary
7. Aganoa Black Sand Beach
8. Mount Vaea
9. Vaipouli Beach
10. Falealupo Canopy Walkway.

San Marino
1. Guaita Tower
2. Basilica di San Marino
3. Palazzo Pubblico
4. Rocca del Sasso
5. Mount Titano
6. Cesta Tower
7. Museo di Stato
8. Piazza della Libertà
9. Porto di San Marino
10. Museo delle Creature della Notte.

Sao Tome and Principe
1. Pico Cao Grande
2. Sao Tome National Museum
3. Forte de Sao Sebastiao
4. Praia Piscina
5. Monte Carmo
6. Ilheu das Rolas
7. Boca do Inferno
8. Cascata Sao Nicolau
9. Praia Jale
10. Praia Inhame

Saudi Arabia
1. Masmak Fortress
2. Al-Ula
3. Prophet's Mosque
4. Red Sea Coral Reefs
5. Edge of the World
6. Madain Saleh
7. Jabal al-Lawz
8. Kingdom Tower
9. Mount Uhud
10. Souqs (marketplaces) in Jeddah and Riyadh

Senegal
1. Goree Island
2. Lake Retba
3. Dakar Monument
4. Pink Lake
5. African Renaissance Monument
6. Saint Louis Island
7. House of Slaves
8. Niokolo-Koba National Park
9. Saloum Delta National Park
10. Djoudj National Bird Sanctuary

Serbia
1. Belgrade Fortress
2. Kalemegdan Park
3. St. Sava Temple
4. Petrovaradin Fortress
5. National Museum of Serbia
6. Republic Square
7. Niš Fortress
8. Fruška Gora National Park
9. Zlatibor mountain resort
10. Studenica Monastery

Seychelles
1. Anse Lazio
2. Anse Source d'Argent
3. Vallee de Mai Nature Reserve
4. Morne Seychellois National Park
5. Beau Vallon Beach
6. Petite Anse
7. Curieuse Island
8. Aldabra Atoll
9. Grand Anse
10. Baie Lazare Beach

Sierra Leone
1. Tacugama Chimpanzee Sanctuary
2. Outamba Kilimi National Park
3. Bureh Beach
4. Bunce Island
5. John Obey Beach
6. Freetown Cotton Tree
7. Sierra Leone National Museum
8. Lumley Beach
9. Bonthe Island
10. River Number Two Beach.

Singapore
1. Marina Bay Sands
2. Gardens by the Bay
3. Sentosa Island
4. Universal Studios Singapore
5. Singapore Zoo
6. Merlion Park
7. Clarke Quay
8. Chinatown
9. Orchard Road
10. Singapore Botanic Gardens

Slovakia
1. High Tatras
2. Spiš Castle
3. Bratislava Old Town
4. Slovak Paradise National Park
5. Orava Castle
6. Bojnice Castle
7. Demänovská Cave System
8. Čičmany Village
9. Liptovský Mikuláš
10. Devín Castle

Slovenia
1. Lake Bled 
2. Postojna Cave 
3. Ljubljana Castle 
4. Predjama Castle 
5. Triglav National Park 
6. Skocjan Caves 
7. Piran 
8. Ptuj Castle 
9. Koper 
10. Maribor Old Town

Solomon Islands
1. Guadalcanal Island 
2. Marovo Lagoon 
3. Uepi Island 
4. Bonegi Beach 
5. Munda 
6. Tenaru Falls 
7. Rennell Island 
8. Tavanipupu Island 
9. Tetepare Island 
10. Honiara Central Market

Somalia
1. Mogadishu Cathedral
2. Laas Geel cave paintings
3. Jazeera Beach
4. Hargeisa Regional Museum
5. Daloh Mountains
6. Berbera Beach
7. Mogadishu Lighthouse
8. National Theatre of Somalia
9. Mogadishu Port
10. Gezira Beach

South Africa
1. Kruger National Park 
2. Table Mountain 
3. Cape of Good Hope 
4. Robben Island 
5. Victoria & Alfred Waterfront 
6. Durban's Golden Mile 
7. Apartheid Museum 
8. Boulders Beach 
9. Sun City Resort 
10. The Garden Route.

South Korea
1. Changdeokgung Palace
2. Jeju Island
3. Gyeongbokgung Palace
4. Haeundae Beach
5. Namsan Tower
6. Lotte World
7. Bukchon Hanok Village
8. DMZ (Demilitarized Zone)
9. Seoraksan National Park
10. Myeong-dong shopping district

South Sudan
1. Juba
2. Boma National Park
3. Nimule National Park
4. Sudd Swamp
5. Mount Kinyeti
6. Kutumaria Game Reserve
7. Bor County
8. Yei
9. Kidepo Valley National Park
10. Malakal

Spain
1. Sagrada Familia, Barcelona
2. Alhambra, Granada
3. Park Güell, Barcelona
4. La Rambla, Barcelona
5. Historic Center of Madrid
6. Plaza Mayor, Madrid
7. Royal Palace of Madrid
8. Cathedral of Seville
9. Plaza de España, Seville
10. Prado Museum, Madrid

Sri Lanka
1. Sigiriya Rock Fortress
2. Temple of the Tooth (Sri Dalada Maligawa)
3. Yala National Park
4. Galle Fort
5. Adam's Peak
6. Dambulla Cave Temple (Golden Temple)
7. Horton Plains National Park
8. Pinnawala Elephant Orphanage
9. Mirissa Beach
10. Kandy Lake

Sudan
1. Pyramids of Meroe
2. Jebel Barkal
3. National Museum of Sudan
4. Khartoum Nile River Cruise
5. Naqa and Musawwarat es-Sufra
6. Sanganeb National Park
7. Tuti Island
8. Sufi dance performances
9. Dinder National Park
10. Blue and White Niles convergence

Suriname
1. Paramaribo historic inner city
2. Brownsberg Nature Park
3. Galibi Nature Reserve
4. Commewijne River
5. Fort Zeelandia
6. Central Market Paramaribo
7. Suriname River
8. Nieuw Nickerie
9. Bergendal Eco & Cultural River Resort
10. Peperpot Nature Park

Sweden
1. Stockholm
2. Gothenburg
3. Malmö
4. Uppsala
5. Visby
6. Luleå
7. Kiruna
8. Ystad
9. Helsingborg
10. Örebro

Switzerland
1. Matterhorn
2. Lake Geneva
3. Rhine Falls
4. Chillon Castle
5. Jungfraujoch
6. Lucerne
7. Zermatt
8. Aletsch Glacier
9. Interlaken
10. Bern

Syria
1. Damascus
2. Palmyra 
3. Krak des Chevaliers 
4. Umayyad Mosque 
5. Aleppo Citadel 
6. Apamea 
7. Dead Cities 
8. Souq Al-Hamidiyya 
9. Ma'loula 
10. Azem Palace

Taiwan
1. Taipei 101
2. Taroko National Park
3. National Palace Museum
4. Sun Moon Lake
5. Jiufen Old Street
6. Kenting National Park
7. Shifen Waterfall
8. Yangmingshan National Park
9. Alishan National Scenic Area
10. Tainan Anping Fort

Tajikistan
1. Iskanderkul Lake
2. Pamir Highway
3. Hissor Fort
4. Rudaki Park
5. National Museum of Tajikistan
6. Sarez Lake
7. Fann Mountains
8. Varzob Gorge
9. Botanical Garden of Dushanbe
10. Vakhan Corridor.

Tanzania
1. Serengeti National Park
2. Mount Kilimanjaro
3. Ngorongoro Conservation Area
4. Zanzibar Archipelago
5. Tarangire National Park
6. Selous Game Reserve
7. Lake Victoria
8. Lake Manyara National Park
9. Mafia Island
10. Pemba Island

Thailand
1. Wat Phra Kaew and the Grand Palace, Bangkok
2. The floating markets, Bangkok
3. Chiang Mai Night Bazaar, Chiang Mai
4. Railay Beach, Krabi
5. Phi Phi Islands, Phuket
6. Ancient city of Ayutthaya, near Bangkok
7. Wat Arun (Temple of Dawn), Bangkok
8. Doi Suthep, Chiang Mai
9. Jim Thompson House, Bangkok
10. The Sanctuary of Truth, Pattaya

Timor-Leste (formerly East Timor)
1. Cristo Rei of Dili
2. Nino Konis Santana National Park
3. Jaco Island
4. Atauro Island
5. Tasitolu Peace Park
6. Tais Market
7. Mt. Ramelau
8. Dare Memorial Museum
9. Fort Jesus
10. Baucau Beaches.

Togo
1. Koutammakou
2. Tamberma Valley
3. Grand Marche
4. Mount Agou
5. Lake Togo
6. Fazao Malfakassa National Park
7. Sacred Forest of Kpasse
8. Cascade de Kpime
9. Slave House of Togo
10. Akodessewa Fetish Market

Tonga
1. Tongatapu
2. Vava'u
3. Ha'apai
4. 'Eua
5. Mapu'a 'a Vaea Blowholes
6. Hafengehulu Beach
7. Royal Palace of Tonga
8. Nuku'alofa Market
9. Anahulu Cave
10. Talamahu Market

Trinidad and Tobago
1. Maracas Beach
2. Pigeon Point Beach
3. Queen's Park Savannah
4. The Pitch Lake
5. Fort George
6. Buccoo Reef
7. Mount St. Benedict Monastery
8. Caroni Bird Sanctuary
9. Asa Wright Nature Centre
10. Chaguaramas Boardwalk

Tunisia
1. Carthage
2. Sidi Bou Said
3. Bardo Museum
4. Tunisia's Sahara Desert
5. Tunis Medina
6. El Djem Amphitheatre
7. Hammamet
8. Kairouan
9. Djerba Island
10. Dougga Archaeological Site

Turkey
1. Istanbul
2. Cappadocia
3. Ephesus
4. Pamukkale
5. Bodrum
6. Antalya
7. Gallipoli
8. Troy
9. Mount Nemrut
10. Sumela Monastery

Turkmenistan
1. Darvaza Gas Crater
2. Ashgabat city
3. Ancient city of Merv
4. Kow-Ata Underground Lake
5. Yangykala Canyon
6. Nisa Historical and Cultural Monument
7. Konye-Urgench Historical and Architectural Reserve
8. Geok Tepe Fortress
9. Gonur Depe Archaeological Site
10. Sumbar River Canyon.

Tuvalu
1. Funafuti Lagoon
2. Nanumea Atoll
3. Nanumanga Atoll
4. Talava Arches
5. Nui Atoll
6. Funafala Islet
7. Vaitupu Atoll
8. Niutao Island
9. Nukufetau Atoll
10. Motulalo Sanctuary

Uganda
1. Bwindi Impenetrable National Park
2. Murchison Falls National Park
3. Queen Elizabeth National Park
4. Kibale National Park
5. Lake Mburo National Park
6. Ssese Islands
7. Ziwa Rhino Sanctuary
8. Jinja and the Source of the Nile
9. Rwenzori Mountains National Park
10. Mgahinga Gorilla National Park

Ukraine
1. Kyiv-Pechersk Lavra
2. St. Sophia's Cathedral
3. Lviv Old Town
4. Golden Gate of Kyiv
5. Chernobyl Exclusion Zone
6. Odessa Opera and Ballet Theater
7. Kamianets-Podilskyi Castle
8. Sofiyivka Park 
9. Olesko Castle
10. Tarakaniv Fortifications.

United Arab Emirates (UAE)
1. Burj Khalifa
2. Sheikh Zayed Grand Mosque
3. Dubai Mall
4. Palm Jumeirah
5. Dubai Fountain
6. Dubai Miracle Garden
7. Ski Dubai
8. Abu Dhabi Corniche
9. Ferrari World Abu Dhabi
10. Dubai Marina

United Kingdom (UK)
1. Buckingham Palace
2. Tower of London
3. Stonehenge
4. Edinburgh Castle
5. The British Museum
6. The London Eye
7. The Lake District
8. The Roman Baths
9. Windsor Castle
10. The York Minster

United States of America (USA)
1. Times Square, New York City
2. Grand Canyon National Park, Arizona
3. Walt Disney World, Orlando, Florida
4. Golden Gate Bridge, San Francisco, California
5. The National Mall and Memorial Parks, Washington DC
6. Las Vegas Strip, Nevada
7. Yellowstone National Park, Wyoming, Montana, and Idaho
8. Statue of Liberty, New York City
9. Hollywood Walk of Fame, Los Angeles, California
10. Niagara Falls, New York and Ontario, Canada

Uruguay
1. Montevideo
2. Punta del Este
3. Colonia del Sacramento
4. Cabo Polonio
5. Piriápolis
6. Salto Grande
7. Fortaleza de Santa Teresa
8. Río de la Plata
9. Rambla de Montevideo
10. Ciudad Vieja

Uzbekistan
1. Registan Square
2. Samarkand
3. Bukhara
4. Khiva
5. Shakhrisabz
6. Amir Timur Museum
7. Chorsu Bazaar
8. Kalyan Minaret
9. Ark Fortress
10. Charvak Reservoir

Vanuatu
1. Mount Yasur
2. Mele Cascades Waterfall
3. Champagne Beach
4. Port Vila Market
5. Hideaway Island Marine Reserve
6. Million Dollar Point
7. Blue Lagoon
8. Ekasup Cultural Village
9. Nanda Blue Hole
10. Erakor Island.

Vatican City (Holy See)
1. St. Peter's Basilica
2. Sistine Chapel
3. Vatican Museums
4. Vatican Gardens
5. Apostolic Palace
6. Piazza San Pietro
7. The Vatican Library
8. Vatican Necropolis
9. Pinacoteca Vaticana
10. Vatican Obelisk

Venezuela
1. Angel Falls
2. Isla Margarita
3. Mount Roraima
4. Los Roques Archipelago National Park
5. Mochima National Park
6. Canaima National Park
7. Morrocoy National Park
8. Salto del Ángel Waterfall
9. Choroni
10. Pico Bolivar

Vietnam
1. Halong Bay 
2. Ho Chi Minh Mausoleum 
3. Hoi An Ancient Town 
4. Saigon Notre Dame Cathedral 
5. Hoan Kiem Lake 
6. Hue Imperial City 
7. Mekong Delta 
8. Cu Chi Tunnels 
9. Phu Quoc Island 
10. Nha Trang Beach

Yemen
1. Old City of Sana'a
2. Shibam Hadramaut
3. Al Saleh Mosque
4. Great Marib Dam
5. Socotra Island
6. Al-Mahwit Dam
7. Thula Fortress
8. Dar al-Hajar
9. Aden Port and Harbour
10. Al-Bakiriyya Ottoman mosque

Zambia
1. Victoria Falls
2. South Luangwa National Park
3. Lower Zambezi National Park
4. Kafue National Park
5. Mosi-oa-Tunya National Park
6. Lusaka National Museum
7. Kabwata Cultural Village
8. Chimfunshi Wildlife Orphanage
9. Kasanka National Park
10. Lake Kariba Cruise`;

const airportContent = 
`Afghanistan,Hamid Karzai International Airport (Kabul),KBL
Albania,Tirana International Airport Nënë Tereza,TIA
Algeria,Houari Boumediene Airport (Algiers),ALG
Andorra,Andorra–La Seu d'Urgell Airport,LEU
Angola,Quatro de Fevereiro Airport (Luanda),LAD
Antigua and Barbuda,V.C. Bird International Airport (St. John's),ANU
Argentina,Ministro Pistarini International Airport (Buenos Aires),EZE
Argentina,Aeroparque Jorge Newbery (Buenos Aires),AEP
Armenia,Zvartnots International Airport (Yerevan),EVN
Australia,Sydney Kingsford-Smith Airport,SYD
Australia,Melbourne Airport,MEL
Australia,Brisbane Airport,BNE
Australia,Perth Airport,PER
Austria,Vienna International Airport,VIE
Azerbaijan,Heydar Aliyev International Airport (Baku),GYD
Bahamas,Lynden Pindling International Airport (Nassau),NAS
Bahrain,Bahrain International Airport,BAH
Bangladesh,Shahjalal International Airport (Dhaka),DAC
Barbados,Grantley Adams International Airport (Bridgetown),BGI
Belarus,Minsk National Airport,MSQ
Belgium,Brussels Airport,BRU
Belize,Philip S. W. Goldson International Airport (Belize City),BZE
Benin,Cadjehoun Airport (Cotonou),COO
Bhutan,Paro International Airport,PBH
Bolivia,El Alto International Airport (La Paz),LPB
Bolivia,Viru Viru International Airport (Santa Cruz),VVI
Bosnia and Herzegovina,Sarajevo International Airport,SJJ
Botswana,Sir Seretse Khama International Airport (Gaborone),GBE
Brazil,São Paulo–Guarulhos International Airport,GRU
Brazil,Rio de Janeiro–Galeão International Airport,GIG
Brazil,Brasília International Airport,BSB
Brunei,Brunei International Airport,BWN
Bulgaria,Sofia Airport,SOF
Burkina Faso,Ouagadougou Airport,OUA
Burundi,Bujumbura International Airport,BJM
Cambodia,Phnom Penh International Airport,PNH
Cambodia,Siem Reap International Airport,REP
Cameroon,Douala International Airport,DLA
Cameroon,Yaoundé Nsimalen International Airport,NSI
Cameroon,Garoua International Airport,GOU
Canada,Toronto Pearson International Airport,YYZ
Canada,Vancouver International Airport,YVR
Canada,Montréal–Pierre Elliott Trudeau International Airport,YUL
Cape Verde,Amílcar Cabral International Airport (Sal),SID
Cape Verde,Nelson Mandela International Airport (Praia),RAI
Chad,N'Djamena International Airport,NDJ
Chile,Comodoro Arturo Merino Benítez International Airport (Santiago),SCL
Chile,Mataveri International Airport (Easter Island),IPC
China,Beijing Capital International Airport,PEK
China,Shanghai Pudong International Airport,PVG
China,Guangzhou Baiyun International Airport,CAN
China,Hong Kong International Airport,HKG
Colombia,El Dorado International Airport (Bogotá),BOG
Colombia,Jose Maria Cordova International Airport (Medellín),MDE
Colombia,Rafael Núñez International Airport (Cartagena),CTG
Comoros,Prince Said Ibrahim International Airport (Moroni),HAH
Congo,Maya-Maya Airport (Brazzaville),BZV
Congo,N'Djili Airport (Kinshasa),FIH
Costa Rica,Juan Santamaría International Airport (San José),SJO
Croatia,Zagreb Airport,ZAG
Cuba,Jose Marti International Airport (Havana),HAV
Cuba,Jardines del Rey Airport (Cayo Coco),CCC
Cuba,Varadero International Airport,VRA
Cyprus,Larnaca International Airport,LCA
Czech Republic,Václav Havel Airport Prague,PRG
Denmark,Copenhagen Airport,CPH
Djibouti,Ambouli International Airport,JIB
Dominica,Douglas-Charles Airport (Dominica),DOM
Dominican Republic,Punta Cana International Airport,PUJ
Dominican Republic,Las Americas International Airport (Santo Domingo),SDQ
East Timor,Presidente Nicolau Lobato International Airport (Dili),DIL
Ecuador,Mariscal Sucre International Airport (Quito),UIO
Ecuador,Jose Joaquin de Olmedo International Airport (Guayaquil),GYE
Egypt,Cairo International Airport,CAI
Egypt,Hurghada International Airport,HRG
Egypt,Sharm El Sheikh International Airport,SSH
El Salvador,Monseñor Óscar Arnulfo Romero International Airport (San Salvador),SAL
Equatorial Guinea,Malabo International Airport,SSG
Eritrea,Asmara International Airport,ASM
Estonia,Tallinn Airport,TLL
Eswatini,King Mswati III International Airport (Manzini),SHO
Ethiopia,Addis Ababa Bole International Airport,ADD
Fiji,Nadi International Airport,NAN
Finland,Helsinki Airport,HEL
France,Charles de Gaulle Airport (Paris),CDG
France,Paris Orly Airport,ORY
France,Nice Côte d'Azur Airport,NCE
France,Lyon–Saint-Exupéry Airport,LYS
Gabon,Libreville International Airport,LBV
Gambia,Banjul International Airport,BJL
Georgia,Tbilisi International Airport,TBS
Germany,Frankfurt Airport,FRA
Germany,Munich Airport,MUC
Germany,Berlin Brandenburg Airport,BER
Ghana,Kotoka International Airport (Accra),ACC
Greece,Athens International Airport,ATH
Greece,Thessaloniki Airport,SKG
Grenada,Maurice Bishop International Airport,GND
Guatemala,La Aurora International Airport (Guatemala City),GUA
Guinea,Conakry International Airport,CKY
Guinea-Bissau,Osvaldo Vieira International Airport (Bissau),OXB
Guyana,Cheddi Jagan International Airport (Georgetown),GEO
Haiti,Toussaint Louverture International Airport (Port-au-Prince),PAP
Honduras,Toncontín International Airport (Tegucigalpa),TGU
Honduras,Ramon Villeda Morales International Airport (San Pedro Sula),SAP
Iceland,Keflavík International Airport,KEF
India,Indira Gandhi International Airport (Delhi),DEL
India,Chhatrapati Shivaji Maharaj International Airport (Mumbai),BOM
India,Kempegowda International Airport (Bengaluru),BLR
India,Chennai International Airport,MAA
India,Netaji Subhash Chandra Bose International Airport (Kolkata),CCU
India,Rajiv Gandhi International Airport (Hyderabad),HYD
India,Cochin International Airport,COK
India,Goa International Airport,GOI
India,Pune International Airport,PNQ
India,Ahmedabad International Airport,AMD
India,Jaipur International Airport,JAI
India,Sardar Vallabhbhai Patel International Airport (Ahmedabad),AMD
Indonesia,Soekarno-Hatta International Airport (Jakarta),CGK
Indonesia,Ngurah Rai International Airport (Bali),DPS
Indonesia,Sultan Hasanuddin International Airport (Makassar),UPG
Iran,Imam Khomeini International Airport (Tehran),IKA
Iran,Mehrabad International Airport (Tehran),THR
Iran,Mashhad International Airport,MHD
Iraq,Baghdad International Airport,BGW
Ireland,Dublin Airport,DUB
Israel,Ben Gurion Airport (Tel Aviv),TLV
Italy,Leonardo da Vinci-Fiumicino Airport (Rome),FCO
Italy,Milan Malpensa Airport,MXP
Italy,Milan Linate Airport,LIN
Italy,Venice Marco Polo Airport,VCE
Italy,Naples International Airport,NAP
Italy,Florence Airport,FLR
Italy,Bologna Guglielmo Marconi Airport,BLQ
Italy,Turin Airport,TRN
Jamaica,Norman Manley International Airport (Kingston),KIN
Jamaica,Sangster International Airport (Montego Bay),MBJ
Japan,Narita International Airport (Tokyo),NRT
Japan,Haneda Airport (Tokyo),HND
Japan,Kansai International Airport (Osaka),KIX
Jordan,Queen Alia International Airport (Amman),AMM
Kazakhstan,Nursultan Nazarbayev International Airport (Nur-Sultan),NQZ
Kazakhstan,Almaty International Airport,ALA
Kenya,Jomo Kenyatta International Airport (Nairobi),NBO
Kenya,Moi International Airport (Mombasa),MBA
Kiribati,Bonriki International Airport (Tarawa),TRW
Kuwait,Kuwait International Airport,KWI
Kyrgyzstan,Manas International Airport (Bishkek),FRU
Laos,Wattay International Airport (Vientiane),VTE
Latvia,Riga International Airport,RIX
Lebanon,Beirut-Rafic Hariri International Airport,BEY
Lesotho,Moshoeshoe I International Airport (Maseru),MSU
Liberia,Roberts International Airport (Monrovia),ROB
Libya,Tripoli International Airport,TIP
Liechtenstein,St Gallen-Altenrhein Airport,ACH
Lithuania,Vilnius Airport,VNO
Luxembourg,Findel Airport,LUX
Madagascar,Ivato International Airport (Antananarivo),TNR
Malawi,Kamuzu International Airport (Lilongwe),LLW
Malaysia,Kuala Lumpur International Airport,KUL
Maldives,Male International Airport,MLE
Malta,Malta International Airport,MLA
Marshall Islands,Marshall Islands International Airport (Majuro),MAJ
Mauritania,Nouakchott–Oumtounsy International Airport,NKC
Mauritius,Sir Seewoosagur Ramgoolam International Airport,MRU
Mexico,Mexico City International Airport,MEX
Mexico,Cancún International Airport,CUN
Mexico,Guanajuato International Airport (León/Guanajuato),BJX
Mexico,Mérida International Airport,MID
Mexico,Monterrey International Airport,MTY
Mexico,Tijuana International Airport,TIJ
Mexico,Los Cabos International Airport,SJD
Mexico,Puerto Vallarta International Airport,PVR
Mexico,Cozumel International Airport,CZM
Mexico,Chichen Itza International Airport,CZA
Mexico,Oaxaca International Airport,OAX
Mexico,Huatulco International Airport,HUX
Mexico,Chetumal International Airport,CTM
Mexico,Zacatecas International Airport,ZCL
Mexico,Puebla International Airport,PBC
Mexico,Querétaro International Airport,QRO
Mexico,Tuxtla Gutiérrez International Airport,TGZ
Mexico,Toluca International Airport,TLC
Mexico,Villahermosa International Airport,VSA
Mexico,Ciudad del Carmen International Airport,CME
Mexico,Veracruz International Airport,VER
Mexico,Mazatlán International Airport,MZT
Mexico,Culiacán International Airport,CUL
Mexico,Acapulco International Airport,ACA
Mexico,Chihuahua International Airport,CUU
Mexico,Tampico International Airport,TAM
Mexico,Torreon International Airport,TRC
Mexico,Manzanillo International Airport,ZLO
Mexico,Minatitlán/Coatzacoalcos International Airport,MTT
Mexico,Reynosa International Airport,REX
Mexico,Leonardo Rodriguez Alcazar Airport (San Luis Potosí),SLP
Mexico,Colima International Airport,CLQ
Mexico,Ciudad Juarez International Airport,CJS
Mexico,Uruapan International Airport,UPN
Mexico,Los Mochis International Airport,LMM
Mexico,Puerto Escondido International Airport,PXM
Mexico,Matamoros International Airport,MAM
Mexico,Guadalajara International Airport,GDL
Mexico,La Paz International Airport,LPB
Mexico,General Lucio Blanco International Airport(REX),REX
Mexico,Durango International Airport,DGO
Mexico,Ciudad Obregón International Airport,CEN
Mexico,Ciudad Victoria International Airport,CVM
Mexico,Ciudad Acuña International Airport,ACN
Mexico,Campeche International Airport,CPE
Mexico,Chilpancingo International Airport,IZT
Mexico,Tapachula International Airport,TAP
Mexico,Saltillo International Airport,SLW
Mexico,Los Pinos Airport (Valle de Bravo),VIB
Mexico,Puerto Peñasco International Airport,PPE
Mexico,Atizapan de Zaragoza Airport,AZP
Mexico,Bahías de Huatulco International Airport,HUX
Mexico,El Lencero Airport,VER
Mexico,San Felipe International Airport,SNF
Mexico,Quetzalcóatl International Airport,NEW
Mexico,Chalchihuites International Airport,HUX
Mexico,Lázaro Cárdenas International Airport,LZC
Mexico,Plan de Guadalupe International Airport,SLW
Mexico,Del Bajío International Airport,BJ
Micronesia,Chuuk International Airport,TKK
Micronesia,Kosrae International Airport,KSA
Micronesia,Pohnpei International Airport,PNI
Micronesia,Yap International Airport,YAP
Moldova,Chisinau International Airport,KIV
Moldova,Balti International Airport,BZY
Monaco,Nice Côte d'Azur Airport,NCE
Monaco,Monaco Heliport,MCM
Mongolia,Chinggis Khaan International Airport,ULN
Montenegro,Podgorica Airport,TGD
Montenegro,Tivat Airport,TIV
Montserrat,John A. Osborne Airport,MNI
Morocco,Marrakech Menara Airport,RAK
Morocco,Mohammed V International Airport,CMN
Morocco,Fes-Saïss Airport,FEZ
Morocco,Rabat-Salé Airport,RBA
Morocco,Ouarzazate Airport,OZZ
Morocco,Agadir-Al Massira Airport,AGA
Morocco,Tanger Ibn Battouta Airport,TNG
Morocco,Nador International Airport,NDR
Mozambique,Maputo International Airport,MPM
Mozambique,Beira Airport,BEW
Mozambique,Nampula Airport,APL
Mozambique,Pemba Airport,POL
Mozambique,Inhambane Airport,INH
Mozambique,Vilankulo Airport,VNX
Mozambique,Quelimane Airport,UEL
Mozambique,Chimoio Airport,VPY
Mozambique,Tete Matunda Airport,TET
Mozambique,Lichinga Airport,VXC
Mozambique,Mueda Airport,MUD
Mozambique,Mocímboa da Praia Airport,MZB
Mozambique,Marrupa Airport,MFU
Myanmar,Yangon International Airport,RGN
Myanmar,Mandalay International Airport,MDL
Myanmar,Nyaung U Airport,NYU
Myanmar,Naypyidaw International Airport,ELA
Namibia,Hosea Kutako International Airport,WDH
Namibia,Eros Airport,ERS
Namibia,Walvis Bay Airport,WVB
Namibia,Ondangwa Airport,OND
Namibia,Rundu Airport,NDU
Namibia,Luderitz Airport,LUD
Namibia,Keetmanshoop Airport,KMP
Namibia,Oranjemund Airport,OMD
Nauru,Nauru International Airport,INU
Nepal,Tribhuvan International Airport,KTM
Nepal,Pokhara Airport,PKR
Nepal,Bharatpur Airport,BHR
Nepal,Surkhet Airport,SIF
Nepal,Sanfebagar Airport,FEB
Nepal,Jumla Airport,JUM
Nepal,Taplejung Airport,TMJ
Nepal,Dolpa Airport,DOP
Nepal,Suketar Airport,SKT
Nepal,Simara Airport,SIF
Nepal,Rajbiraj Airport,RJB
Nepal,Ramechhap Airport,RHP
Nepal,Rajkot Airport,RJK
Nepal,Rumjatar Airport,RUM
Nepal,Rukumkot Airport,RUK
Nepal,Rolpa Airport,RPA
Nepal,Thamkharka Airport,TKA
Nepal,Tulsipur Airport,DNP
Nepal,Tuclungen Airport,TUI
Nepal,Tumling Tar Airport,TMI
Nepal,Tumling
Netherlands,Amsterdam Airport Schiphol,AMS
New Zealand,Auckland Airport,AKL
New Zealand,Wellington Airport,WLG
New Zealand,Christchurch Airport,CHC
Nicaragua,Augusto C. Sandino International Airport (Managua),MGA
Niger,Diori Hamani International Airport (Niamey),NIM
Nigeria,Murtala Muhammed International Airport (Lagos),LOS
Nigeria,Nnamdi Azikiwe International Airport (Abuja),ABV
North Korea,Pyongyang International Airport,FNJ
North Macedonia (formerly Macedonia),Skopje International Airport,SKP
North Macedonia (formerly Macedonia),Ohrid St. Paul the Apostle Airport,OHD
Norway,Oslo Airport, Gardermoen,OSL
Norway,Bergen Airport, Flesland,BGO
Oman,Muscat International Airport,MCT
Oman,Salalah Airport,SLL
Pakistan,Jinnah International Airport (Karachi),KHI
Pakistan,Allama Iqbal International Airport (Lahore),LHE
Pakistan,Islamabad International Airport,ISB
Palau,Roman Tmetuchl International Airport (Koror),ROR
Palestine,Queen Alia International Airport (Amman, Jordan),AMM
Panama,Tocumen International Airport (Panama City),PTY
Panama,Enrique Malek International Airport (David),DAV
Papua New Guinea,Jacksons International Airport (Port Moresby),POM
Papua New Guinea,Mount Hagen Kagamuga Airport,HGU
Paraguay,Silvio Pettirossi International Airport (Asunción),ASU
Peru,Jorge Chávez International Airport (Lima),LIM
Peru,Alejandro Velasco Astete International Airport (Cusco),CUZ
Philippines,Ninoy Aquino International Airport (Manila),MNL
Philippines,Mactan-Cebu International Airport (Cebu),CEB
Philippines,Clark International Airport (Angeles),CRK
Poland,Warsaw Chopin Airport,WAW
Poland,John Paul II International Airport Kraków–Balice,KRK
Portugal,Lisbon Portela Airport,LIS
Portugal,Francisco Sá Carneiro Airport (Porto),OPO
Portugal,Faro Airport,FAO
Qatar,Hamad International Airport (Doha),DOH
Romania,Henri Coandă International Airport (Bucharest),OTP
Romania,Cluj International Airport,CLJ
Russia,Sheremetyevo International Airport (Moscow),SVO
Russia,Domodedovo International Airport (Moscow),DME
Russia,Pulkovo Airport (St. Petersburg),LED
Rwanda,Kigali International Airport,KGL
Saint Kitts and Nevis,Robert L. Bradshaw International Airport (Basseterre),SKB
Saint Lucia,Hewanorra International Airport,UVF
Saint Lucia,George F. L. Charles Airport (Castries),SLU
Saint Vincent and the Grenadines,Argyle International Airport (Kingstown),SVD
Samoa,Faleolo International Airport,APW
San Marino,Federico Fellini International Airport (Rimini, Italy),RMI
São Tomé and Príncipe,São Tomé International Airport,TMS
Saudi Arabia,King Abdulaziz International Airport (Jeddah),JED
Saudi Arabia,King Khalid International Airport (Riyadh),RUH
Senegal,Blaise Diagne International Airport (Dakar),DSS
Serbia,Belgrade Nikola Tesla Airport,BEG
Serbia,Niš Constantine the Great Airport,INI
Seychelles,Seychelles International Airport (Mahé),SEZ
Sierra Leone,Lungi International Airport (Freetown),FNA
Singapore,Singapore Changi Airport,SIN
Slovakia,M. R. Štefánik Airport (Bratislava),BTS
Slovakia,Košice International Airport,KSC
Slovenia,Ljubljana Jože Pučnik Airport,LJU
Solomon Islands,Honiara International Airport,HIR
Somalia,Aden Adde International Airport (Mogadishu),MGQ
South Africa,O. R. Tambo International Airport (Johannesburg),JNB
South Africa,Cape Town International Airport,CPT
South Africa,King Shaka International Airport (Durban),DUR
South Korea,Incheon International Airport (Seoul),ICN
South Korea,Gimpo International Airport (Seoul),GMP
South Sudan,Juba International Airport,JUB
Spain,Adolfo Suárez Madrid–Barajas Airport,MAD
Spain,Barcelona–El Prat Airport,BCN
Spain,Palma de Mallorca Airport,PMI
Sri Lanka,Bandaranaike International Airport (Colombo),CMB
Sri Lanka,Mattala Rajapaksa International Airport (Hambantota),HRI
Sudan,Khartoum International Airport,KRT
Suriname,Johan Adolf Pengel International Airport (Paramaribo),PBM
Sweden,Stockholm Arlanda Airport,ARN
Sweden,Göteborg Landvetter Airport,GOT
Switzerland,Zurich Airport,ZRH
Switzerland,Geneva Airport,GVA
Syria,Damascus International Airport,DAM
Syria,Aleppo International Airport,ALP
Taiwan,Taiwan Taoyuan International Airport (Taipei),TPE
Taiwan,Kaohsiung International Airport,KHH
Tajikistan,Dushanbe International Airport,DYU
Tanzania,Julius Nyerere International Airport (Dar es Salaam),DAR
Tanzania,Kilimanjaro International Airport,JRO
Tanzania,Abeid Amani Karume International Airport (Zanzibar),ZNZ
Thailand,Suvarnabhumi Airport (Bangkok),BKK
Thailand,Don Mueang International Airport (Bangkok),DMK
Thailand,Phuket International Airport,HKT
Timor-Leste (East Timor),Presidente Nicolau Lobato International Airport (Dili),DIL
Togo,Lomé-Tokoin Airport,LFW
Tonga,Fuaʻamotu International Airport (Nukuʻalofa),TBU
Trinidad and Tobago,Piarco International Airport (Port of Spain),POS
Tunisia,Tunis–Carthage International Airport,TUN
Turkey,Istanbul Airport,IST
Turkey,Sabiha Gökçen International Airport (Istanbul),SAW
Turkey,Antalya Airport,AYT
Turkmenistan,Ashgabat International Airport,ASB
Turks and Caicos Islands,Providenciales International Airport,PLS
Tuvalu,Funafuti International Airport,FUN
Uganda,Entebbe International Airport,EBB
Ukraine,Boryspil International Airport (Kyiv),KBP
Ukraine,Lviv Danylo Halytskyi International Airport,LWO
United Arab Emirates,Dubai International Airport,DXB
United Arab Emirates,Abu Dhabi International Airport,AUH
United Kingdom,London Heathrow Airport,LHR
United Kingdom,London Gatwick Airport,LGW
United Kingdom,Manchester Airport,MAN
United States,John F. Kennedy International Airport (New York City),JFK
United States,Los Angeles International Airport,LAX
United States,Hartsfield–Jackson Atlanta International Airport,ATL
Uruguay,Carrasco International Airport (Montevideo),MVD
Uzbekistan,Tashkent International Airport,TAS
Vanuatu,Bauerfield International Airport (Port Vila),VLI
Vatican City,Vatican City Heliport,CVI
Venezuela,Simón Bolívar International Airport (Caracas),CCS
Venezuela,La Chinita International Airport (Maracaibo),MAR
Vietnam,Noi Bai International Airport (Hanoi),HAN
Vietnam,Tan Son Nhat International Airport (Ho Chi Minh City),SGN
Yemen,Sana'a International Airport,SAH
Zambia,Kenneth Kaunda International Airport (Lusaka),LUN
Zimbabwe,Harare International Airport,HRE
Zimbabwe,Victoria Falls International Airport,VFA`;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!, from new app");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/api/itinerary/:countryName", async (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const currentSeason = getSeason(currentDate);
  console.log(`The current season is: ${currentSeason}`);

  const { countryName } = req.params;

  const attractionsContentString = new String(attractionsContent);
  const attractions = getTouristAttractions(attractionsContentString, countryName);
  // console.log(attractions);

  const weatherDependentAttractions = await suitableAttractions(attractions);
  // console.log("Weather-dependent attractions:", weatherDependentAttractions);

  const finalAttractions = await processAttractions(attractions);
  const attractionCoordinates = await getAttractionCoordinates(
    finalAttractions
  );
  console.log(attractionCoordinates);

  const optimalOrderVisit = await getOptimalOrderOfVisit(attractionCoordinates);
  console.log(optimalOrderVisit);
  res.send(optimalOrderVisit);
});

function getTodayDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // months are zero-indexed in JS
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

app.get("/api/flights/:countryName", async (req, res) => {
  const { countryName } = req.params;

  const airportContentString = new String(airportContent);
  const airports = await getInternationalAirportsByCountry(
    airportContentString,
    countryName
  );
  console.log(airports);
  const nearestAirport = await getNearestAirport();
  console.log(nearestAirport);

  const airportArray = allAirports(airportContentString);

  const match = findClosestMatch(nearestAirport, airportArray);
  console.log("the closest match is: " + match);

  const departureCode = findAirportCode(match, airportContentString);
  console.log(departureCode);

  var availableFlights = [];
  var availableFlightsLeastLayover = [];
  for (let i = 0; i < airports.length; i++) {
    const curAirportCode = airports[i];
    try {
      const curFlights = await flightPlanner(
        departureCode,
        curAirportCode,
        getTodayDateFormatted()
      );
      console.log(curFlights);
      availableFlights = availableFlights.concat(curFlights);
    } catch (error) {
      console.error(
        `Failed to retrieve flights for ${curAirportCode}: ${error}`
      );
    }
  }
  for (let i = 0; i < airports.length; i++) {
    const curAirportCode = airports[i];
    try {
      const curFlights = await flightPlannerLeastLayover(
        departureCode,
        curAirportCode,
        getTodayDateFormatted()
      );
      console.log(curFlights);
      availableFlightsLeastLayover =
        availableFlightsLeastLayover.concat(curFlights);
    } catch (error) {
      console.error(
        `Failed to retrieve flights for ${curAirportCode}: ${error}`
      );
    }
  }

  function filterCheapestFlights(flights) {
    const sortedFlights = flights.sort((a, b) => {
      const priceA = parseFloat(a.price.total);
      const priceB = parseFloat(b.price.total);
      return priceA - priceB;
    });
    const cheapestFlights = sortedFlights.slice(0, 1);

    return cheapestFlights;
  }

  function filterFewestLayovers(flights) {
    const sortedFlights = flights.sort((a, b) => {
      const layoversA = a.itineraries[0].segments.length - 1; // Assuming itineraries always have at least one segment
      const layoversB = b.itineraries[0].segments.length - 1;
      return layoversA - layoversB;
    });
    const flightWithFewestLayovers = sortedFlights.slice(0, 1);
    return flightWithFewestLayovers;
  }

  const cheapestFlights = filterCheapestFlights(availableFlights);
  const leastLayoverFlights = filterFewestLayovers(
    availableFlightsLeastLayover
  );
  console.log(cheapestFlights);
  console.log(leastLayoverFlights);

  const combinedFlights = cheapestFlights.concat(leastLayoverFlights);

  function extractFlightProperties(flights) {
    const extractedProperties = [];

    for (const flight of flights) {
      const price = flight.price.total;

      const numberOfLayovers = flight.itineraries[0].segments.length - 1;

      const airline = flight.validatingAirlineCodes[0];

      const startTime = flight.itineraries[0].segments[0].departure.at;
      const endTime =
        flight.itineraries[0].segments[
          flight.itineraries[0].segments.length - 1
        ].arrival.at;

      const totalDuration = flight.itineraries[0].duration.replace("PT", "");
      const hours = totalDuration.includes("H")
        ? parseInt(totalDuration.split("H")[0])
        : 0;
      const minutes = totalDuration.includes("M")
        ? parseInt(totalDuration.split("H")[1].replace("M", ""))
        : 0;

      extractedProperties.push({
        price,
        numberOfLayovers,
        airline,
        startTime,
        endTime,
        totalDuration: { hours, minutes },
      });
    }

    return extractedProperties;
  }

  const filteredData = extractFlightProperties(combinedFlights);
  console.log(filteredData);
  res.send(filteredData);
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String },
  population: { type: Number },
  timezone: { type: String, required: true },
  currency: { type: String, required: true },
  language: { type: String },
  popular_attractions: [{ type: String }],
  emergency_service_number: { type: Number, required: true },
  local_customs: [{ type: String }],
  local_cuisine: [{ type: String }],
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});
const City = mongoose.model("City2", citySchema);

app.get("/api/cities/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const city = await City.findOne({ name });
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    return res.json(city);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//   getting a unique personalized summary for each city
app.get("/api/cohere/citySummary/:city", async (req, res) => {
  try {
    cohere.init(process.env.COHERE_API_KEY);
    const { city } = req.params;
    const response = await cohere.generate({
      prompt: `Give me a summary of ${city}.`,
      model: process.env.COHERE_CITY_SUMMARY,
      max_tokens: 100,
    });
    console.log(JSON.stringify(response, null, 3));
    // res.send(JSON.stringify(response, null, 3));
    res.send(JSON.stringify(response.body.generations[0].text));
    console.log(JSON.stringify(response.body.generations[0].text));
  } catch (error) {
    console.error("Error classifying data:", error);
    res.status(400).json({ error: "An error occurred while classifying data" });
  }
});

//   generate what types of attractions the hobbies relate to
app.get("/api/cohere/hobbies/:interest", async (req, res) => {
  try {
    cohere.init(process.env.COHERE_API_KEY);
    const { interest } = req.params;
    const response = await cohere.classify({
      inputs: [`${interest}`],
      model: process.env.COHERE_INTERESTS_ATTRACTIONS,
      max_tokens: 100,
    });
    console.log(JSON.stringify(response.body.classifications[0].prediction));
    res.send(JSON.stringify(response.body.classifications[0].prediction));
  } catch (error) {
    console.error("Error classifying data:", error);
    res.status(400).json({ error: "An error occurred while classifying data" });
  }
});

// takes in origin, destination, and date and returns 3 cheapest fllights
app.get(
  "/api/amadeus/flightPlanner/:origin/:destination/:date",
  async (req, res) => {
    const { origin } = req.params;
    const { destination } = req.params;
    const { date } = req.params;
    const clientId = process.env.AMADEUS_API_KEY;
    const clientSecret = process.env.AMADEUS_API_SECRET;
    async function getAccessToken(apiKey, apiSecret) {
      const baseUrl = "https://test.api.amadeus.com/v1";
      const tokenEndpoint = "/security/oauth2/token";

      try {
        const response = await axios.post(
          `${baseUrl}${tokenEndpoint}`,
          `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        return response.data.access_token;
      } catch (error) {
        console.error(error.response.data);
        throw new Error("Failed to retrieve access token");
      }
    }
    async function searchFlightOffers() {
      const baseUrl = "https://test.api.amadeus.com/v2";

      try {
        const accessToken = await getAccessToken(clientId, clientSecret);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const params = {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: date,
          adults: 2,
        };
        const response = await axios.get(`${baseUrl}/shopping/flight-offers`, {
          headers,
          params,
        });

        const jsonData = response.data;
        const filteredFlights = jsonData.data
          .filter((flight) => flight.price && flight.price.grandTotal)
          .sort(
            (a, b) =>
              parseFloat(a.price.grandTotal) - parseFloat(b.price.grandTotal)
          );
        const cheapestFlights = filteredFlights.slice(0, 3);
        cheapestFlights.forEach((flight, index) => {
          console.log(`Flight ${index + 1}:`);
          for (const key in flight) {
            console.log(`${key}:`, flight[key]);
          }
          console.log("---------------------------------------");
        });

        // res.json(JSON.stringify(response.data));
      } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Failed to retrieve flight offers" });
      }
    }
    try {
      await searchFlightOffers();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

/* helper functions */
function getSeason(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if ((month === 12 && day >= 21) || (month <= 2 && day < 20)) {
    return "Winter";
  } else if (month >= 3 && month <= 5) {
    return "Spring";
  } else if (month >= 6 && month <= 8) {
    return "Summer";
  } else {
    return "Fall";
  }
}

async function weatherDependent(attractionName) {
  try {
    cohere.init(process.env.COHERE_API_KEY);
    const activityArray = [attractionName];
    const response = await cohere.classify({
      model: process.env.COHERE_ACTIVITY_WEATHER_DEPENDENCY,
      inputs: activityArray,
    });
    const prediction = response.body.classifications[0].prediction;
    return prediction;
  } catch (error) {
    console.error("Error classifying data:", error);
  }
}

async function bestSeason(attractionName) {
  try {
    cohere.init(process.env.COHERE_API_KEY);
    const activityArray = [attractionName];
    const response = await cohere.classify({
      model: process.env.COHERE_SEASON_ACTIVITIES,
      inputs: activityArray,
    });

    const prediction = response.body.classifications[0].prediction;
    return prediction;
  } catch (error) {
    console.error("Error classifying data:", error);
  }
}

function getTouristAttractions(text, countryName) {
  const lines = text.split("\n");
  const attractions = [];

  let isTargetCountry = false;
  for (let line of lines) {
    line = line.trim();

    if (line === countryName) {
      isTargetCountry = true;
    } else if (line.startsWith(countryName)) {
      isTargetCountry = false;
    } else if (isTargetCountry && line !== "") {
      const attraction = line.split(". ")[1];
      attractions.push(attraction);
    }
    if (attractions.length === 10) {
      break;
    }
  }
  return attractions;
}

async function suitableAttractions(attractions) {
  console.log("Started classifying");
  const weatherDependentAttractions = [];

  for (let i = 0; i < attractions.length; i++) {
    const attraction = attractions[i];
    try {
      const prediction = await weatherDependent(attraction);
      const season = await bestSeason(attraction);
      console.log(`Prediction for ${attraction}: ${prediction} ${season}`);
      if (prediction === " no") {
        weatherDependentAttractions.push(attraction);
      } else if (prediction === " yes") {
        const currentDate = new Date();
        const currentSeason = getSeason(currentDate);

        if (season === currentSeason) {
          console.log("was here");
          weatherDependentAttractions.push(attraction);
        }
      }
    } catch (error) {
      console.error(`Error classifying ${attraction}:`, error);
    }
  }
  return weatherDependentAttractions;
}

async function processAttractions(attractions) {
  const weatherDependentAttractions = await suitableAttractions(attractions);
  console.log("Weather dependent attractions:", weatherDependentAttractions);
  return weatherDependentAttractions;
}

async function getInternationalAirportsByCountry(data, countryName) {
  var lines = data.split("\n");
  var result = [];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line !== "") {
      var parts = line.split(",");
      if (parts.length >= 3) {
        var country = parts[0].trim();
        var airportName = parts[1].trim();
        var airportCode = parts[2].trim();

        if (country === countryName) {
          result.push(airportCode);
        }
      }
    }
  }
  return result;
}

function allAirports(data) {
  var result = [];
  var lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const entry = lines[i];
    const [country = "", airport = "", code = ""] = entry.split(",");
    result.push(airport.trim());

    // console.log(`Country: ${country.trim()}`);
    // console.log(`Airport: ${airport.trim()}`);
    // console.log(`Code: ${code.trim()}`);
    // console.log("--------------------");
  }
  return result;
}

function findAirportCode(airportName, data) {
  var lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const entry = lines[i];
    const [country = "", airport = "", code = ""] = entry.split(",");
    const curAirport = airport.trim();
    if (curAirport === airportName) {
      return code;
    }
  }
  return null;
}

async function getNearestAirport() {
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

  try {
    const response = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`
    );
    const { lat, lng } = response.data.location;

    const location = `${lat},${lng}`;
    const radius = 5000000;
    const keyword = "airport";
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;

    try {
      const response = await axios.get(placesUrl);
      const results = response.data.results;
      if (results.length > 0) {
        const airport = results[0];
        const airportName = airport.name;
        return airportName;
      } else {
        throw new Error("No airports found near the location.");
      }
    } catch (error) {
      console.error("Error retrieving nearest airport:", error);
    }
  } catch (error) {
    console.error("Error getting user location:", error);
  }
}

function findClosestMatch(str, arr) {
  let closestMatch = null;
  let closestDistance = Infinity;

  for (let i = 0; i < arr.length; i++) {
    const currentStr = arr[i];
    const distance = calculateLevenshteinDistance(str, currentStr);

    if (distance < closestDistance) {
      closestMatch = currentStr;
      closestDistance = distance;
    }
  }

  return closestMatch;
}

function calculateLevenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1
        );
      }
    }
  }
  return dp[m][n];
}

async function flightPlanner(origin, destination, date) {
  const clientId = process.env.AMADEUS_API_KEY;
  const clientSecret = process.env.AMADEUS_API_SECRET;

  try {
    const getAccessToken = async (apiKey, apiSecret) => {
      const baseUrl = "https://test.api.amadeus.com/v1";
      const tokenEndpoint = "/security/oauth2/token";

      try {
        const response = await axios.post(
          `${baseUrl}${tokenEndpoint}`,
          `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        return response.data.access_token;
      } catch (error) {
        console.error(error.response.data);
        throw new Error("Failed to retrieve access token");
      }
    };

    const searchFlightOffers = async () => {
      const baseUrl = "https://test.api.amadeus.com/v2";

      try {
        const accessToken = await getAccessToken(clientId, clientSecret);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const params = {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: date,
          adults: 2,
        };
        const response = await axios.get(`${baseUrl}/shopping/flight-offers`, {
          headers,
          params,
        });

        const jsonData = response.data;
        const filteredFlights = jsonData.data
          .filter((flight) => flight.price && flight.price.grandTotal)
          .sort(
            (a, b) =>
              parseFloat(a.price.grandTotal) - parseFloat(b.price.grandTotal)
          );
        const cheapestFlights = filteredFlights.slice(0, 3);
        return cheapestFlights;
      } catch (error) {
        console.error(error.response?.data || error.message);
        throw new Error("Failed to retrieve flight offers");
      }
    };

    const flights = await searchFlightOffers();
    return flights;
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
}

async function flightPlannerLeastLayover(origin, destination, date) {
  const clientId = process.env.AMADEUS_API_KEY;
  const clientSecret = process.env.AMADEUS_API_SECRET;

  try {
    const getAccessToken = async (apiKey, apiSecret) => {
      const baseUrl = "https://test.api.amadeus.com/v1";
      const tokenEndpoint = "/security/oauth2/token";

      try {
        const response = await axios.post(
          `${baseUrl}${tokenEndpoint}`,
          `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        return response.data.access_token;
      } catch (error) {
        console.error(error.response.data);
        throw new Error("Failed to retrieve access token");
      }
    };

    const searchFlightOffers = async () => {
      const baseUrl = "https://test.api.amadeus.com/v2";

      try {
        const accessToken = await getAccessToken(clientId, clientSecret);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };
        const params = {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: date,
          adults: 2,
        };
        const response = await axios.get(`${baseUrl}/shopping/flight-offers`, {
          headers,
          params,
        });

        const jsonData = response.data;
        const filteredFlights = jsonData.data
          .filter((flight) => flight.price && flight.price.grandTotal)
          .sort(
            (a, b) =>
              a.itineraries[0].segments.length -
              b.itineraries[0].segments.length
          );
        const shortestLayoversFlights = filteredFlights.slice(0, 3);
        return shortestLayoversFlights;
      } catch (error) {
        console.error(error.response?.data || error.message);
        throw new Error("Failed to retrieve flight offers");
      }
    };

    const flights = await searchFlightOffers();
    return flights;
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred");
  }
}

async function getAttractionCoordinates(attractionNames) {
  const apiKey = process.env.GOOGLE_MAP_API_KEY;
  const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";

  const attractionCoordinates = [];

  for (const attractionName of attractionNames) {
    try {
      const response = await axios.get(baseUrl, {
        params: {
          address: attractionName,
          key: apiKey,
        },
      });

      const results = response.data.results;
      if (results.length > 0) {
        const location = results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        attractionCoordinates.push({
          attraction: attractionName,
          latitude,
          longitude,
        });
      } else {
        console.log(`Could not find coordinates for '${attractionName}'.`);
      }
    } catch (error) {
      console.error(
        `Error occurred while fetching coordinates for '${attractionName}': ${error}`
      );
    }
  }
  return attractionCoordinates;
}

function euclideanDistance(coordA, coordB) {
  const dx = coordA.longitude - coordB.longitude;
  const dy = coordA.latitude - coordB.latitude;
  return Math.sqrt(dx * dx + dy * dy);
}

async function getOptimalOrderOfVisit(attractionCoordinates) {
  const numAttractions = attractionCoordinates.length;
  const visited = Array(numAttractions).fill(false);

  const startIndex = 0;
  visited[startIndex] = true;

  const optimalOrder = [startIndex];
  while (optimalOrder.length < numAttractions) {
    let nearestNeighborIndex = -1;
    let nearestNeighborDistance = Infinity;

    const currentCoord =
      attractionCoordinates[optimalOrder[optimalOrder.length - 1]];
    for (let i = 0; i < numAttractions; i++) {
      if (!visited[i]) {
        const distance = euclideanDistance(
          currentCoord,
          attractionCoordinates[i]
        );
        if (distance < nearestNeighborDistance) {
          nearestNeighborDistance = distance;
          nearestNeighborIndex = i;
        }
      }
    }
    visited[nearestNeighborIndex] = true;
    optimalOrder.push(nearestNeighborIndex);
  }
  const orderedAttractions = optimalOrder.map(
    (index) => `${index + 1}. ${attractionCoordinates[index].attraction}`
  );

  return orderedAttractions;
}
