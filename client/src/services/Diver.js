export default {
  /**
   * function to set Bluetooth device display
   **/
  fromIntTypeToTypeDetail (type) {
    switch (type) {
      case 1076:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Camcorder'}

      case 1056:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Car Audio'}

      case 1032:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Hands Free'}

      case 1048:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Headphones'}

      case 1064:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Hifi Audio'}

      case 1044:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Loudspeaker'}

      case 1040:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Microphone'}

      case 1052:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Portable Audio'}

      case 1060:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Set Top Box'}

      case 1024:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Uncategorized Audio/Video'}

      case 1068:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'VCR'}

      case 1072:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Video Camera'}

      case 1088:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Video Conferencing'}

      case 1084:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Video Display Loudspeaker'}

      case 1096:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Video Gaming Toy'}

      case 1080:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Video Monitor'}

      case 1028:
        return {'icon': 'fa fa-play-circle fa-4x', 'typeName': 'Wearable Headset'}

      case 272:
        return {'icon': 'fa fa-laptop fa-4x', 'typeName': 'Handheld PC/PDA'}

      case 260:
        return {'icon': 'fa fa-laptop fa-4x', 'typeName': 'Desktop'}

      case 268:
        return {'icon': 'fa fa-laptop fa-4x', 'typeName': 'Laptop'}

      case 276:
        return {'icon': 'fa fa-laptop fa-4x', 'typeName': 'Palm Size PC PDA'}

      case 264:
        return {'icon': 'fa fa-laptop fa-4x', 'typeName': 'Server'}

      case 256:
        return {'icon': 'fa fa-laptop fa-4x', 'typeName': 'Uncategorized Computer'}

      case 2308:
        return {'icon': 'fa fa-heartbeat fa-4x', 'typeName': 'Blood Pressure'}

      case 2332:
        return {'icon': 'fa fa-heartbeat fa-4x', 'typeName': 'Data Display'}

      case 2320:
        return {'icon': 'fa fa-heartbeat fa-4x', 'typeName': 'Glucose'}

      case 2324:
        return {'icon': 'fa fa-heartbeat fa-4x', 'typeName': 'Oxymeter'}

      case 2328:
        return {'icon': 'fa fa-heartbeat fa-4x', 'typeName': 'Pulse Rate'}

      case 2312:
        return {'icon': 'fa fa-heartbeat fa-4x', 'typeName': 'Thermometer'}

      case 2304:
        return {'icon': 'fa fa-heartbeat fa-4x', 'typeName': 'Uncategorized Health Display'}

      case 2316:
        return {'icon': 'fa fa-heartbeat fa-4x', 'typeName': 'Weighing'}

      case 516:
        return {'icon': 'fa fa-mobile fa-4x', 'typeName': 'Cellular'}

      case 520:
        return {'icon': 'fa fa-mobile fa-4x', 'typeName': 'Cordless'}

      case 532:
        return {'icon': 'fa fa-mobile fa-4x', 'typeName': 'ISDN'}

      case 528:
        return {'icon': 'fa fa-mobile fa-4x', 'typeName': 'Modem or Gateway'}

      case 524:
        return {'icon': 'fa fa-mobile fa-4x', 'typeName': 'Smart'}

      case 512:
        return {'icon': 'fa fa-mobile fa-4x', 'typeName': 'Uncategorized Phone'}

      case 2064:
        return {'icon': 'fa fa-futbol-o fa-4x', 'typeName': 'Toy: Controller'}

      case 2060:
        return {'icon': 'fa fa-futbol-o fa-4x', 'typeName': 'Toy: Doll Action Figure'}

      case 2068:
        return {'icon': 'fa fa-futbol-o fa-4x', 'typeName': 'Toy: Game'}

      case 2052:
        return {'icon': 'fa fa-futbol-o fa-4x', 'typeName': 'Toy: Robot'}

      case 2048:
        return {'icon': 'fa fa-futbol-o fa-4x', 'typeName': 'Uncategorized Toy'}

      case 2056:
        return {'icon': 'fa fa-futbol-o fa-4x', 'typeName': 'Toy: Vehicle'}

      case 1812:
        return {'icon': 'fa fa-male fa-4x', 'typeName': 'Glasses'}

      case 1808:
        return {'icon': 'fa fa-male fa-4x', 'typeName': 'Helmet'}

      case 1800:
        return {'icon': 'fa fa-male fa-4x', 'typeName': 'Jacket'}

      case 1792:
        return {'icon': 'fa fa-male fa-4x', 'typeName': 'Uncategorized Wearable'}

      case 1796:
        return {'icon': 'fa fa-male fa-4x', 'typeName': 'Wrist Watch'}

      default:
        return {'icon': 'fa fa-question-circle fa-4x', 'typeName': 'Unknown'}
    }
  },
  /**
   * Supported tokens :

   token:     description:             example:
   #YYYY#     4-digit year             1999
   #YY#       2-digit year             99
   #MMMM#     full month name          February
   #MMM#      3-letter month name      Feb
   #MM#       2-digit month number     02
   #M#        month number             2
   #DDDD#     full weekday name        Wednesday
   #DDD#      3-letter weekday name    Wed
   #DD#       2-digit day number       09
   #D#        day number               9
   #th#       day ordinal suffix       nd
   #hhhh#     2-digit 24-based hour    17
   #hhh#      military/24-based hour   17
   #hh#       2-digit hour             05
   #h#        hour                     5
   #mm#       2-digit minute           07
   #m#        minute                   7
   #ss#       2-digit second           09
   #s#        second                   9
   #ampm#     "am" or "pm"             pm
   #AMPM#     "AM" or "PM"             PM

   * @param formatString
   * @param date (in milliseconds)
   * @returns date string with chosen
   */
  dateFormatter (formatString, date) {
    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th
    var dateObject = new Date(date)
    YY = ((YYYY = dateObject.getFullYear()) + '').slice(-2)
    MM = (M = dateObject.getMonth() + 1) < 10 ? ('0' + M) : M
    MMM = (MMMM = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'][M - 1]).substring(0, 3)
    DD = (D = dateObject.getDate()) < 10 ? ('0' + D) : D
    DDD = (DDDD = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samdi'][dateObject.getDay()]).substring(0, 3)
    th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) === 1) ? 'st' : (dMod === 2) ? 'nd' : (dMod === 3) ? 'rd' : 'th'
    formatString = formatString.replace('#YYYY#', YYYY).replace('#YY#', YY).replace('#MMMM#', MMMM).replace('#MMM#', MMM).replace('#MM#', MM).replace('#M#', M).replace('#DDDD#', DDDD).replace('#DDD#', DDD).replace('#DD#', DD).replace('#D#', D).replace('#th#', th)

    h = (hhh = dateObject.getHours())
    if (h === 0) h = 24
    if (h > 12) h -= 12
    hh = h < 10 ? ('0' + h) : h
    hhhh = hhh < 10 ? ('0' + hhh) : hhh
    AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase()
    mm = (m = dateObject.getMinutes()) < 10 ? ('0' + m) : m
    ss = (s = dateObject.getSeconds()) < 10 ? ('0' + s) : s
    return formatString.replace('#hhhh#', hhhh).replace('#hhh#', hhh).replace('#hh#', hh).replace('#h#', h).replace('#mm#', mm).replace('#m#', m).replace('#ss#', ss).replace('#s#', s).replace('#ampm#', ampm).replace('#AMPM#', AMPM)
  },
  /**
   * Remove space from a string
   * @param string
   * @returns {string}
   */
  spaceRemover (string) {
    let result = ''
    for (let i = 0; i < string.length; i++) {
      let caracter = string[i]
      // eslint-disable-next-line
      if (caracter != ' ') {
        result = result + caracter
      }
    }
    return result
  }
}
