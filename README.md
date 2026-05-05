# Sähkön spot hinnan tarkastelu sovellus
Repositorio sisältää sovelluksen sähkön spot hinnan tarkkailuun. Ohjelma on tehty Akamonin trainee rekryttointiprosessin tehtävänä.

## Kuvaus
Sovellus noutaa sähkön spot hinnat Akamonin avoimesta rajapinnasta.
Sovelluksessa käyttäjä voi valita minkä maan/alueen hintoja haluaa hakea, minkä pituisina intervalleina, ja miltä aikaväliltä.
Hinnat esitetään taulukossa maakohtainen arvolisävero huomioituna yksikössä c/kWh.

## Testaaminen
Voit ajaa projektin docker kontissa seuraavilla komennoilla projektin juuresta. Käynnistetty projekti löytyy osoitteesta http://localhost:5173/:

Rakenna image:
```bash
npm run container-build
```

Käynnistä kontti (portti 5173, sama kun vite):
```bash
npm run start
```

Rakenna sammuta ja poista kontti:
```bash
npm run stop
```


## Työprosessista
Tehtävää aloittaessa sekä graphQL sekä typescript olivat vieraita teknologioita. Toki javascriptilla olen kaksi samantyylistä projektia tehnyt, joten typescriptiin tottui hyvin nopeasti. Muutamia yllätyksiä tuli kuitenkin matkaan, kuten contextien määrityksessä vaaditut tyypit ja lintteri vaati useEffect funktioiden kanssa kaikki sen sisällä käytetyt funktiot lisättäväksi dependency taulukkoon.
GraphQL oli myös paljon simppelimpi, kun mitä tehtävän ensimmäistä kertaa luettuani ajattelin.

Tehtävänannossa oli esitetty parametrit, ja parametreille esimerkkiarvot. Näiden perusteella päätin, mitä ominaisuuksia käyttäjä voi sovelluksessa muokata. TenantId oli mysteeri, joten kysyin mikä sen idea on, ja selvisi tehtävän kannalta lähes merkityksettömäksi. Suunnittelin aluksi alueen, ja resoluution valinnat dropdown menuiksi. Näin vältytään virheiltä, kun käyttäjä saa valita valmiista vaihtoehdoista. Aikajakson toteutuksen ajattelin jo alusta asti kalenterimaisena taulukkona. Onneksi siihen oli olemassa kätevä valmiiksi tehty komponentti, joten se ei tuottanut suuria haasteita. Itse hintadatan ajattelin esittää aluksi kuvaajana, hieman samoin kuin fortumin sivuilla. Kuitenkin aikajaksolla leikittyäni totesin, että kuvaaja ei oikein toimisi luotettavasti suuren datamäärän vuoksi. Päädyinkin siksi esittämään spot hinnat taulukkona.

Tehtävän aikana toteutukset muuttuivat myös hieman tarpeen mukaan. Esimerkiksi Form komponenttia jouduin muokkaamaan useamman kerran huomatessani toiminnan kannalta puutteita. FormContext syntyikin tästä tarpeesta, sillä oli tarpeellista säilyttää formin tiedot komponentin uudelleenrenderöinnin yli. Itse hintadatan päätin myös säilyttää contextissa, sillä se on keskeinen data koko sovelluksen toiminnan kannalta. Tietojen päivitys myös optimoitui ajan mittaa, ja lopullisessa versiossa uusi haku tehdäänkin vain, jos jokin parametri oikeasti muuttuu. Jokainen haku kuitenkin hakee kaiken datan uudelleen.

Oli mielekästä huomata, että pystyin projektissa myös uudelleenkäyttämään aiemmin keväällä tekemäni projektin ohjelmakoodia. Muunmuassa Header komponentti, ja koko sovelluksen tyyli, on mukaelma Javascriptilla toteuttamastani smarthome projektista. Todellisuudessa olisin voinut varmasti kierrättää enemmänkin koodia tästä projektista, mutta tuntui hyödyllisemmältä kirjoittaa itse, ja samalla totutella typescriptin tuntumaan.

Projektin tekemisen aloitin maanantai aamuna, ja se vei arviolta tehtävänannon avaamishetkestä noin 17 tuntia. Sopivasti kaksi työpäivää riitti oivallisesti projektin tekemiseen.

## Jatkoa
Projektia tehdessä mietin myös mahdollisia parannuksia. Olen yliopistossa oppinut filosofian "ensin tehdään toimiva, sitten hieno ja sitten optimaalinen". Kohti optimaalisuutta siirryttäessä tekisinkin ainakin seuraavaa:

1. Mikäli resoluutio ei muutu, haetaan rajapinnasta vain muuttunut osa. Esimerkiksi jos on haettu aikaväli 2.4.-3.4. ja jatketaan väliä 5.4. asti, haetaan vain väli 3.4.-5.4. Säästettäisiin palvelimen laskentatehoa.

2. Toteuttaisin hinnan kehitystä havainnollistavan kuvaajan taulukon ohelle, jotta käyttäjä kykenee tarkastelemaan trendejä helpommin.

3. Perehtyisin paremmin DayPicker komponenttiin ja korjaisin tyylin kokonaan vastaamaan muuta sovellusta.

4. Automaattinen testaus.


