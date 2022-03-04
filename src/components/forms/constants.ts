import { GranteeFinanceAPIMap } from './../../types';

// project categories
export const PROJECT_CATEGORY_OPTIONS = [
  { value: 'Community and education', label: 'Community and education' },
  { value: 'Community event', label: 'Community event' },
  { value: 'Consensus layer', label: 'Consensus layer' },
  {
    value: 'Cryptography and zero knowledge proofs',
    label: 'Cryptography and zero knowledge proofs'
  },
  { value: 'Developer experience and tooling', label: 'Developer experience and tooling' },
  { value: 'Execution layer', label: 'Execution layer' },
  { value: 'General research', label: 'General research' },
  { value: 'Layer 2', label: 'Layer 2' },
  { value: 'Other', label: 'Other' }
];

export const ACADEMIC_GRANTS_PROJECT_CATEGORY_OPTIONS = [
  { value: 'Economics', label: 'Economics' },
  { value: 'Consensus layer', label: 'Consensus layer' },
  { value: 'Formal Verification', label: 'Formal Verification' },
  { value: 'Miner Extracted Value (MEV)', label: 'Miner Extracted Value (MEV)' },
  {
    value: 'Cryptography and zero knowledge proofs',
    label: 'Cryptography and zero knowledge proofs'
  },
  { value: 'P2P networking', label: 'P2P networking' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'Other', label: 'Other' }
];

// events
export const EVENT_TYPE_OPTIONS = [
  { value: 'Conference', label: 'Conference' },
  { value: 'Hackathon', label: 'Hackathon' },
  { value: 'Meetup', label: 'Meetup' },
  { value: 'Speaker Series', label: 'Speaker Series' },
  { value: 'Other', label: 'Other' }
];

export const EVENT_FORMAT_OPTIONS = [
  { value: 'In-person', label: 'In-person' },
  { value: 'Online', label: 'Online' },
  { value: 'Hybrid (both)', label: 'Hybrid (both)' }
];

export const WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Maybe', label: 'Maybe' }
];

// countries
export const COUNTRY_OPTIONS = [
  {
    value: 'AF',
    label: 'Afghanistan'
  },
  {
    value: 'AX',
    label: 'Åland Islands'
  },
  {
    value: 'AL',
    label: 'Albania'
  },
  {
    value: 'DZ',
    label: 'Algeria'
  },
  {
    value: 'AS',
    label: 'American Samoa'
  },
  {
    value: 'AD',
    label: 'Andorra'
  },
  {
    value: 'AO',
    label: 'Angola'
  },
  {
    value: 'AI',
    label: 'Anguilla'
  },
  {
    value: 'AQ',
    label: 'Antarctica'
  },
  {
    value: 'AG',
    label: 'Antigua and Barbuda'
  },
  {
    value: 'AR',
    label: 'Argentina'
  },
  {
    value: 'AM',
    label: 'Armenia'
  },
  {
    value: 'AW',
    label: 'Aruba'
  },
  {
    value: 'AU',
    label: 'Australia'
  },
  {
    value: 'AT',
    label: 'Austria'
  },
  {
    value: 'AZ',
    label: 'Azerbaijan'
  },
  {
    value: 'BS',
    label: 'Bahamas'
  },
  {
    value: 'BH',
    label: 'Bahrain'
  },
  {
    value: 'BD',
    label: 'Bangladesh'
  },
  {
    value: 'BB',
    label: 'Barbados'
  },
  {
    value: 'BY',
    label: 'Belarus'
  },
  {
    value: 'BE',
    label: 'Belgium'
  },
  {
    value: 'BZ',
    label: 'Belize'
  },
  {
    value: 'BJ',
    label: 'Benin'
  },
  {
    value: 'BM',
    label: 'Bermuda'
  },
  {
    value: 'BT',
    label: 'Bhutan'
  },
  {
    value: 'BO',
    label: 'Bolivia, Plurinational State of'
  },
  {
    value: 'BQ',
    label: 'Bonaire, Sint Eustatius and Saba'
  },
  {
    value: 'BA',
    label: 'Bosnia and Herzegovina'
  },
  {
    value: 'BW',
    label: 'Botswana'
  },
  {
    value: 'BV',
    label: 'Bouvet Island'
  },
  {
    value: 'BR',
    label: 'Brazil'
  },
  {
    value: 'IO',
    label: 'British Indian Ocean Territory'
  },
  {
    value: 'BN',
    label: 'Brunei Darussalam'
  },
  {
    value: 'BG',
    label: 'Bulgaria'
  },
  {
    value: 'BF',
    label: 'Burkina Faso'
  },
  {
    value: 'BI',
    label: 'Burundi'
  },
  {
    value: 'CV',
    label: 'Cabo Verde'
  },
  {
    value: 'KH',
    label: 'Cambodia'
  },
  {
    value: 'CM',
    label: 'Cameroon'
  },
  {
    value: 'CA',
    label: 'Canada'
  },
  {
    value: 'KY',
    label: 'Cayman Islands'
  },
  {
    value: 'CF',
    label: 'Central African Republic'
  },
  {
    value: 'TD',
    label: 'Chad'
  },
  {
    value: 'CL',
    label: 'Chile'
  },
  {
    value: 'CN',
    label: 'China'
  },
  {
    value: 'CX',
    label: 'Christmas Island'
  },
  {
    value: 'CC',
    label: 'Cocos (Keeling) Islands'
  },
  {
    value: 'CO',
    label: 'Colombia'
  },
  {
    value: 'KM',
    label: 'Comoros'
  },
  {
    value: 'CG',
    label: 'Congo'
  },
  {
    value: 'CD',
    label: 'Congo, Democratic Republic of the'
  },
  {
    value: 'CK',
    label: 'Cook Islands'
  },
  {
    value: 'CR',
    label: 'Costa Rica'
  },
  {
    value: 'HR',
    label: 'Croatia'
  },
  {
    value: 'CU',
    label: 'Cuba'
  },
  {
    value: 'CW',
    label: 'Curaçao'
  },
  {
    value: 'CY',
    label: 'Cyprus'
  },
  {
    value: 'CZ',
    label: 'Czechia'
  },
  {
    value: 'CI',
    label: "Côte d'Ivoire"
  },
  {
    value: 'DK',
    label: 'Denmark'
  },
  {
    value: 'DJ',
    label: 'Djibouti'
  },
  {
    value: 'DM',
    label: 'Dominica'
  },
  {
    value: 'DO',
    label: 'Dominican Republic'
  },
  {
    value: 'EC',
    label: 'Ecuador'
  },
  {
    value: 'EG',
    label: 'Egypt'
  },
  {
    value: 'SV',
    label: 'El Salvador'
  },
  {
    value: 'GQ',
    label: 'Equatorial Guinea'
  },
  {
    value: 'ER',
    label: 'Eritrea'
  },
  {
    value: 'EE',
    label: 'Estonia'
  },
  {
    value: 'SZ',
    label: 'Eswatini'
  },
  {
    value: 'ET',
    label: 'Ethiopia'
  },
  {
    value: 'FK',
    label: 'Falkland Islands (Malvinas)'
  },
  {
    value: 'FO',
    label: 'Faroe Islands'
  },
  {
    value: 'FJ',
    label: 'Fiji'
  },
  {
    value: 'FI',
    label: 'Finland'
  },
  {
    value: 'FR',
    label: 'France'
  },
  {
    value: 'GF',
    label: 'French Guiana'
  },
  {
    value: 'PF',
    label: 'French Polynesia'
  },
  {
    value: 'TF',
    label: 'French Southern Territories'
  },
  {
    value: 'GA',
    label: 'Gabon'
  },
  {
    value: 'GM',
    label: 'Gambia'
  },
  {
    value: 'GE',
    label: 'Georgia'
  },
  {
    value: 'DE',
    label: 'Germany'
  },
  {
    value: 'GH',
    label: 'Ghana'
  },
  {
    value: 'GI',
    label: 'Gibraltar'
  },
  {
    value: 'GR',
    label: 'Greece'
  },
  {
    value: 'GL',
    label: 'Greenland'
  },
  {
    value: 'GD',
    label: 'Grenada'
  },
  {
    value: 'GP',
    label: 'Guadeloupe'
  },
  {
    value: 'GU',
    label: 'Guam'
  },
  {
    value: 'GT',
    label: 'Guatemala'
  },
  {
    value: 'GG',
    label: 'Guernsey'
  },
  {
    value: 'GN',
    label: 'Guinea'
  },
  {
    value: 'GW',
    label: 'Guinea-Bissau'
  },
  {
    value: 'GY',
    label: 'Guyana'
  },
  {
    value: 'HT',
    label: 'Haiti'
  },
  {
    value: 'HM',
    label: 'Heard Island and McDonald Islands'
  },
  {
    value: 'VA',
    label: 'Holy See'
  },
  {
    value: 'HN',
    label: 'Honduras'
  },
  {
    value: 'HK',
    label: 'Hong Kong'
  },
  {
    value: 'HU',
    label: 'Hungary'
  },
  {
    value: 'IS',
    label: 'Iceland'
  },
  {
    value: 'IN',
    label: 'India'
  },
  {
    value: 'ID',
    label: 'Indonesia'
  },
  {
    value: 'IR',
    label: 'Iran, Islamic Republic of'
  },
  {
    value: 'IQ',
    label: 'Iraq'
  },
  {
    value: 'IE',
    label: 'Ireland'
  },
  {
    value: 'IM',
    label: 'Isle of Man'
  },
  {
    value: 'IL',
    label: 'Israel'
  },
  {
    value: 'IT',
    label: 'Italy'
  },
  {
    value: 'JM',
    label: 'Jamaica'
  },
  {
    value: 'JP',
    label: 'Japan'
  },
  {
    value: 'JE',
    label: 'Jersey'
  },
  {
    value: 'JO',
    label: 'Jordan'
  },
  {
    value: 'KZ',
    label: 'Kazakhstan'
  },
  {
    value: 'KE',
    label: 'Kenya'
  },
  {
    value: 'KI',
    label: 'Kiribati'
  },
  {
    value: 'KP',
    label: "Korea, Democratic People's Republic of"
  },
  {
    value: 'KR',
    label: 'Korea, Republic of'
  },
  {
    value: 'KW',
    label: 'Kuwait'
  },
  {
    value: 'KG',
    label: 'Kyrgyzstan'
  },
  {
    value: 'LA',
    label: "Lao People's Democratic Republic"
  },
  {
    value: 'LV',
    label: 'Latvia'
  },
  {
    value: 'LB',
    label: 'Lebanon'
  },
  {
    value: 'LS',
    label: 'Lesotho'
  },
  {
    value: 'LR',
    label: 'Liberia'
  },
  {
    value: 'LY',
    label: 'Libya'
  },
  {
    value: 'LI',
    label: 'Liechtenstein'
  },
  {
    value: 'LT',
    label: 'Lithuania'
  },
  {
    value: 'LU',
    label: 'Luxembourg'
  },
  {
    value: 'MO',
    label: 'Macao'
  },
  {
    value: 'MG',
    label: 'Madagascar'
  },
  {
    value: 'MW',
    label: 'Malawi'
  },
  {
    value: 'MY',
    label: 'Malaysia'
  },
  {
    value: 'MV',
    label: 'Maldives'
  },
  {
    value: 'ML',
    label: 'Mali'
  },
  {
    value: 'MT',
    label: 'Malta'
  },
  {
    value: 'MH',
    label: 'Marshall Islands'
  },
  {
    value: 'MQ',
    label: 'Martinique'
  },
  {
    value: 'MR',
    label: 'Mauritania'
  },
  {
    value: 'MU',
    label: 'Mauritius'
  },
  {
    value: 'YT',
    label: 'Mayotte'
  },
  {
    value: 'MX',
    label: 'Mexico'
  },
  {
    value: 'FM',
    label: 'Micronesia, Federated States of'
  },
  {
    value: 'MD',
    label: 'Moldova, Republic of'
  },
  {
    value: 'MC',
    label: 'Monaco'
  },
  {
    value: 'MN',
    label: 'Mongolia'
  },
  {
    value: 'ME',
    label: 'Montenegro'
  },
  {
    value: 'MS',
    label: 'Montserrat'
  },
  {
    value: 'MA',
    label: 'Morocco'
  },
  {
    value: 'MZ',
    label: 'Mozambique'
  },
  {
    value: 'MM',
    label: 'Myanmar'
  },
  {
    value: 'NA',
    label: 'Namibia'
  },
  {
    value: 'NR',
    label: 'Nauru'
  },
  {
    value: 'NP',
    label: 'Nepal'
  },
  {
    value: 'NL',
    label: 'Netherlands'
  },
  {
    value: 'NC',
    label: 'New Caledonia'
  },
  {
    value: 'NZ',
    label: 'New Zealand'
  },
  {
    value: 'NI',
    label: 'Nicaragua'
  },
  {
    value: 'NE',
    label: 'Niger'
  },
  {
    value: 'NG',
    label: 'Nigeria'
  },
  {
    value: 'NU',
    label: 'Niue'
  },
  {
    value: 'NF',
    label: 'Norfolk Island'
  },
  {
    value: 'MK',
    label: 'North Macedonia'
  },
  {
    value: 'MP',
    label: 'Northern Mariana Islands'
  },
  {
    value: 'NO',
    label: 'Norway'
  },
  {
    value: 'OM',
    label: 'Oman'
  },
  {
    value: 'PK',
    label: 'Pakistan'
  },
  {
    value: 'PW',
    label: 'Palau'
  },
  {
    value: 'PS',
    label: 'Palestine, State of'
  },
  {
    value: 'PA',
    label: 'Panama'
  },
  {
    value: 'PG',
    label: 'Papua New Guinea'
  },
  {
    value: 'PY',
    label: 'Paraguay'
  },
  {
    value: 'PE',
    label: 'Peru'
  },
  {
    value: 'PH',
    label: 'Philippines'
  },
  {
    value: 'PN',
    label: 'Pitcairn'
  },
  {
    value: 'PL',
    label: 'Poland'
  },
  {
    value: 'PT',
    label: 'Portugal'
  },
  {
    value: 'PR',
    label: 'Puerto Rico'
  },
  {
    value: 'QA',
    label: 'Qatar'
  },
  {
    value: 'RO',
    label: 'Romania'
  },
  {
    value: 'RU',
    label: 'Russian Federation'
  },
  {
    value: 'RW',
    label: 'Rwanda'
  },
  {
    value: 'RE',
    label: 'Réunion'
  },
  {
    value: 'BL',
    label: 'Saint Barthélemy'
  },
  {
    value: 'SH',
    label: 'Saint Helena, Ascension and Tristan da Cunha'
  },
  {
    value: 'KN',
    label: 'Saint Kitts and Nevis'
  },
  {
    value: 'LC',
    label: 'Saint Lucia'
  },
  {
    value: 'MF',
    label: 'Saint Martin (French part)'
  },
  {
    value: 'PM',
    label: 'Saint Pierre and Miquelon'
  },
  {
    value: 'VC',
    label: 'Saint Vincent and the Grenadines'
  },
  {
    value: 'WS',
    label: 'Samoa'
  },
  {
    value: 'SM',
    label: 'San Marino'
  },
  {
    value: 'ST',
    label: 'Sao Tome and Principe'
  },
  {
    value: 'SA',
    label: 'Saudi Arabia'
  },
  {
    value: 'SN',
    label: 'Senegal'
  },
  {
    value: 'RS',
    label: 'Serbia'
  },
  {
    value: 'SC',
    label: 'Seychelles'
  },
  {
    value: 'SL',
    label: 'Sierra Leone'
  },
  {
    value: 'SG',
    label: 'Singapore'
  },
  {
    value: 'SX',
    label: 'Sint Maarten (Dutch part)'
  },
  {
    value: 'SK',
    label: 'Slovakia'
  },
  {
    value: 'SI',
    label: 'Slovenia'
  },
  {
    value: 'SB',
    label: 'Solomon Islands'
  },
  {
    value: 'SO',
    label: 'Somalia'
  },
  {
    value: 'ZA',
    label: 'South Africa'
  },
  {
    value: 'GS',
    label: 'South Georgia and the South Sandwich Islands'
  },
  {
    value: 'SS',
    label: 'South Sudan'
  },
  {
    value: 'ES',
    label: 'Spain'
  },
  {
    value: 'LK',
    label: 'Sri Lanka'
  },
  {
    value: 'SD',
    label: 'Sudan'
  },
  {
    value: 'SR',
    label: 'Suriname'
  },
  {
    value: 'SJ',
    label: 'Svalbard and Jan Mayen'
  },
  {
    value: 'SE',
    label: 'Sweden'
  },
  {
    value: 'CH',
    label: 'Switzerland'
  },
  {
    value: 'SY',
    label: 'Syrian Arab Republic'
  },
  {
    value: 'TW',
    label: 'Taiwan, Province of China'
  },
  {
    value: 'TJ',
    label: 'Tajikistan'
  },
  {
    value: 'TZ',
    label: 'Tanzania, United Republic of'
  },
  {
    value: 'TH',
    label: 'Thailand'
  },
  {
    value: 'TL',
    label: 'Timor-Leste'
  },
  {
    value: 'TG',
    label: 'Togo'
  },
  {
    value: 'TK',
    label: 'Tokelau'
  },
  {
    value: 'TO',
    label: 'Tonga'
  },
  {
    value: 'TT',
    label: 'Trinidad and Tobago'
  },
  {
    value: 'TN',
    label: 'Tunisia'
  },
  {
    value: 'TR',
    label: 'Turkey'
  },
  {
    value: 'TM',
    label: 'Turkmenistan'
  },
  {
    value: 'TC',
    label: 'Turks and Caicos Islands'
  },
  {
    value: 'TV',
    label: 'Tuvalu'
  },
  {
    value: 'UG',
    label: 'Uganda'
  },
  {
    value: 'UA',
    label: 'Ukraine'
  },
  {
    value: 'AE',
    label: 'United Arab Emirates'
  },
  {
    value: 'GB',
    label: 'United Kingdom'
  },
  {
    value: 'UM',
    label: 'United States Minor Outlying Islands'
  },
  {
    value: 'US',
    label: 'United States'
  },
  {
    value: 'UY',
    label: 'Uruguay'
  },
  {
    value: 'UZ',
    label: 'Uzbekistan'
  },
  {
    value: 'VU',
    label: 'Vanuatu'
  },
  {
    value: 'VE',
    label: 'Venezuela, Bolivarian Republic of'
  },
  {
    value: 'VN',
    label: 'Viet Nam'
  },
  {
    value: 'VG',
    label: 'Virgin Islands, British'
  },
  {
    value: 'VI',
    label: 'Virgin Islands, U.S.'
  },
  {
    value: 'WF',
    label: 'Wallis and Futuna'
  },
  {
    value: 'EH',
    label: 'Western Sahara'
  },
  {
    value: 'YE',
    label: 'Yemen'
  },
  {
    value: 'ZM',
    label: 'Zambia'
  },
  {
    value: 'ZW',
    label: 'Zimbabwe'
  }
];

// timezones
export const TIMEZONE_OPTIONS = [
  {
    value: 'GMT+14:00 Line Is. Time (Pacific/Kiritimati)',
    label: 'GMT+14:00 Line Is. Time (Pacific/Kiritimati)'
  },
  {
    value: 'GMT+13:00 Phoenix Is.Time (Pacific/Enderbury)',
    label: 'GMT+13:00 Phoenix Is.Time (Pacific/Enderbury)'
  },
  {
    value: 'GMT+13:00 Tonga Time (Pacific/Tongatapu)',
    label: 'GMT+13:00 Tonga Time (Pacific/Tongatapu)'
  },
  {
    value: 'GMT+12:45 Chatham Standard Time (Pacific/Chatham)',
    label: 'GMT+12:45 Chatham Standard Time (Pacific/Chatham)'
  },
  {
    value: 'GMT+12:00 New Zealand Standard Time (Pacific/Auckland)',
    label: 'GMT+12:00 New Zealand Standard Time (Pacific/Auckland)'
  },
  { value: 'GMT+12:00 Fiji Time (Pacific/Fiji)', label: 'GMT+12:00 Fiji Time (Pacific/Fiji)' },
  {
    value: 'GMT+12:00 Petropavlovsk-Kamchatski Time (Asia/Kamchatka)',
    label: 'GMT+12:00 Petropavlovsk-Kamchatski Time (Asia/Kamchatka)'
  },
  {
    value: 'GMT+11:30 Norfolk Time (Pacific/Norfolk)',
    label: 'GMT+11:30 Norfolk Time (Pacific/Norfolk)'
  },
  {
    value: 'GMT+11:00 Lord Howe Standard Time (Australia/Lord_Howe)',
    label: 'GMT+11:00 Lord Howe Standard Time (Australia/Lord_Howe)'
  },
  {
    value: 'GMT+11:00 Solomon Is. Time (Pacific/Guadalcanal)',
    label: 'GMT+11:00 Solomon Is. Time (Pacific/Guadalcanal)'
  },
  {
    value: 'GMT+10:30 Australian Central Standard Time (South Australia) Australia/Adelaide)',
    label: 'GMT+10:30 Australian Central Standard Time (South Australia) Australia/Adelaide)'
  },
  {
    value: 'GMT+10:00 Australian Eastern StandardTime (New South Wales) (Australia/Sydney)',
    label: 'GMT+10:00 Australian Eastern StandardTime (New South Wales) (Australia/Sydney)'
  },
  {
    value: 'GMT+10:00 Australian Eastern Standard Time (Queensland) (Australia/Brisbane)',
    label: 'GMT+10:00 Australian Eastern Standard Time (Queensland) (Australia/Brisbane)'
  },
  {
    value: 'GMT+09:30 Australian Central Standard Time (Northern Territory) (Australia/Darwin)',
    label: 'GMT+09:30 Australian Central Standard Time (Northern Territory) (Australia/Darwin)'
  },
  {
    value: 'GMT+09:00 Korea Standard Time (Asia/Seoul)',
    label: 'GMT+09:00 Korea Standard Time (Asia/Seoul)'
  },
  {
    value: 'GMT+09:00 Japan Standard Time (Asia/Tokyo)',
    label: 'GMT+09:00 Japan Standard Time (Asia/Tokyo)'
  },
  {
    value: 'GMT+08:00 Hong Kong Time (Asia/Hong_Kong)',
    label: 'GMT+08:00 Hong Kong Time (Asia/Hong_Kong)'
  },
  {
    value: 'GMT+08:00 Malaysia Time (Asia/Kuala_Lumpur)',
    label: 'GMT+08:00 Malaysia Time (Asia/Kuala_Lumpur)'
  },
  {
    value: 'GMT+08:00 Philippines Time (Asia/Manila)',
    label: 'GMT+08:00 Philippines Time (Asia/Manila)'
  },
  {
    value: 'GMT+08:00 China Standard Time (Asia/Shanghai)',
    label: 'GMT+08:00 China Standard Time (Asia/Shanghai)'
  },
  {
    value: 'GMT+08:00 Singapore Time (Asia/Singapore)',
    label: 'GMT+08:00 Singapore Time (Asia/Singapore)'
  },
  {
    value: 'GMT+08:00 China Standard Time (Asia/Taipei)',
    label: 'GMT+08:00 China Standard Time (Asia/Taipei)'
  },
  {
    value: 'GMT+08:00 Australian Western Standard Time (Australia/Perth)',
    label: 'GMT+08:00 Australian Western Standard Time (Australia/Perth)'
  },
  {
    value: 'GMT+07:00 Indochina Time (Asia/Bangkok)',
    label: 'GMT+07:00 Indochina Time (Asia/Bangkok)'
  },
  {
    value: 'GMT+07:00 Indochina Time (Asia/Ho_Chi_Minh)',
    label: 'GMT+07:00 Indochina Time (Asia/Ho_Chi_Minh)'
  },
  {
    value: 'GMT+07:00 West Indonesia Time (Asia/Jakarta)',
    label: 'GMT+07:00 West Indonesia Time (Asia/Jakarta)'
  },
  {
    value: 'GMT+06:30 Myanmar Time (Asia/Rangoon)',
    label: 'GMT+06:30 Myanmar Time (Asia/Rangoon)'
  },
  {
    value: 'GMT+06:00 Bangladesh Time (Asia/Dhaka)',
    label: 'GMT+06:00 Bangladesh Time (Asia/Dhaka)'
  },
  {
    value: 'GMT+05:45 Nepal Time (Asia/Kathmandu)',
    label: 'GMT+05:45 Nepal Time (Asia/Kathmandu)'
  },
  {
    value: 'GMT+05:30 India Standard Time (Asia/Colombo)',
    label: 'GMT+05:30 India Standard Time (Asia/Colombo)'
  },
  {
    value: 'GMT+05:30 India Standard Time (Asia/Kolkata)',
    label: 'GMT+05:30 India Standard Time (Asia/Kolkata)'
  },
  {
    value: 'GMT+05:00 Pakistan Time (Asia/Karachi)',
    label: 'GMT+05:00 Pakistan Time (Asia/Karachi)'
  },
  {
    value: 'GMT+05:00 Uzbekistan Time (Asia/Tashkent)',
    label: 'GMT+05:00 Uzbekistan Time (Asia/Tashkent)'
  },
  {
    value: 'GMT+05:00 Yekaterinburg Time (Asia/Yekaterinburg)',
    label: 'GMT+05:00 Yekaterinburg Time (Asia/Yekaterinburg)'
  },
  {
    value: 'GMT+04:30 Afghanistan Time (Asia/Kabul)',
    label: 'GMT+04:30 Afghanistan Time (Asia/Kabul)'
  },
  {
    value: 'GMT+04:00 Azerbaijan Summer Time (Asia/Baku)',
    label: 'GMT+04:00 Azerbaijan Summer Time (Asia/Baku)'
  },
  {
    value: 'GMT+04:00 Gulf Standard Time (Asia/Dubai)',
    label: 'GMT+04:00 Gulf Standard Time (Asia/Dubai)'
  },
  {
    value: 'GMT+04:00 Georgia Time (Asia/Tbilisi)',
    label: 'GMT+04:00 Georgia Time (Asia/Tbilisi)'
  },
  {
    value: 'GMT+04:00 Armenia Time (Asia/Yerevan)',
    label: 'GMT+04:00 Armenia Time (Asia/Yerevan)'
  },
  {
    value: 'GMT+03:30 Iran Daylight Time (Asia/Tehran)',
    label: 'GMT+03:30 Iran Daylight Time (Asia/Tehran)'
  },
  {
    value: 'GMT+03:00 East African Time (Africa/Nairobi)',
    label: 'GMT+03:00 East African Time (Africa/Nairobi)'
  },
  {
    value: 'GMT+03:00 Arabia Standard Time (Asia/Baghdad)',
    label: 'GMT+03:00 Arabia Standard Time (Asia/Baghdad)'
  },
  {
    value: 'GMT+03:00 Arabia Standard Time (Asia/Kuwait)',
    label: 'GMT+03:00 Arabia Standard Time (Asia/Kuwait)'
  },
  {
    value: 'GMT+03:00 Arabia Standard Time (Asia/Riyadh)',
    label: 'GMT+03:00 Arabia Standard Time (Asia/Riyadh)'
  },
  {
    value: 'GMT+03:00 Moscow Standard Time (Europe/Minsk)',
    label: 'GMT+03:00 Moscow Standard Time (Europe/Minsk)'
  },
  {
    value: 'GMT+03:00 Moscow Standard Time (Europe/Moscow)',
    label: 'GMT+03:00 Moscow Standard Time (Europe/Moscow)'
  },
  {
    value: 'GMT+03:00 Eastern European Summer Time (Africa/Cairo)',
    label: 'GMT+03:00 Eastern European Summer Time (Africa/Cairo)'
  },
  {
    value: 'GMT+03:00 Eastern European Summer Time (Asia/Beirut)',
    label: 'GMT+03:00 Eastern European Summer Time (Asia/Beirut)'
  },
  {
    value: 'GMT+03:00 Israel Daylight Time (Asia/Jerusalem)',
    label: 'GMT+03:00 Israel Daylight Time (Asia/Jerusalem)'
  },
  {
    value: 'GMT+03:00 Eastern European Summer Time (Europe/Athens)',
    label: 'GMT+03:00 Eastern European Summer Time (Europe/Athens)'
  },
  {
    value: 'GMT+03:00 Eastern European Summer Time (Europe/Bucharest)',
    label: 'GMT+03:00 Eastern European Summer Time (Europe/Bucharest)'
  },
  {
    value: 'GMT+03:00 Israel Daylight Time (Asia/Jerusalem)',
    label: 'GMT+03:00 Israel Daylight Time (Asia/Jerusalem)'
  },
  {
    value: 'GMT+03:00 Eastern European Summer Time (Europe/Helsinki)',
    label: 'GMT+03:00 Eastern European Summer Time (Europe/Helsinki)'
  },
  {
    value: 'GMT+03:00 Eastern European Summer Time (Europe/Istanbul)',
    label: 'GMT+03:00 Eastern European Summer Time (Europe/Istanbul)'
  },
  {
    value: 'GMT+02:00 South Africa Standard Time (Africa/Johannesburg)',
    label: 'GMT+02:00 South Africa Standard Time (Africa/Johannesburg)'
  },
  {
    value: 'GMT+02:00 Central European Summer Time (Europe/Amsterdam)',
    label: 'GMT+02:00 Central European Summer Time (Europe/Amsterdam)'
  },
  {
    value: 'GMT+02:00 Central European Summer Time (Europe/Berlin)',
    label: 'GMT+02:00 Central European Summer Time (Europe/Berlin)'
  },
  {
    value: 'GMT+02:00 Central European Summer Time (Europe/Brussels)',
    label: 'GMT+02:00 Central European Summer Time (Europe/Brussels)'
  },
  {
    value: 'GMT+02:00 Central European Summer Time (Europe/Paris)',
    label: 'GMT+02:00 Central European Summer Time (Europe/Paris)'
  },
  {
    value: 'GMT+02:00 Central European Summer Time (Europe/Prague)',
    label: 'GMT+02:00 Central European Summer Time (Europe/Prague)'
  },
  {
    value: 'GMT+02:00 Central European Summer Time (Europe/Rome)',
    label: 'GMT+02:00 Central European Summer Time (Europe/Rome)'
  },
  {
    value: 'GMT+01:00 Western European Summer Time (Europe/Lisbon)',
    label: 'GMT+01:00 Western European Summer Time (Europe/Lisbon)'
  },
  {
    value: 'GMT+01:00 Central European Time (Africa/Algiers)',
    label: 'GMT+01:00 Central European Time (Africa/Algiers)'
  },
  {
    value: 'GMT+01:00 British Summer Time (Europe/London)',
    label: 'GMT+01:00 British Summer Time (Europe/London)'
  },
  {
    value: 'GMT–01:00 Cape Verde Time (Atlantic/Cape_Verde)',
    label: 'GMT–01:00 Cape Verde Time (Atlantic/Cape_Verde)'
  },
  {
    value: 'GMT+00:00 Western European Time (Africa/Casablanca)',
    label: 'GMT+00:00 Western European Time (Africa/Casablanca)'
  },
  {
    value: 'GMT+00:00 Irish Summer Time (Europe/Dublin)',
    label: 'GMT+00:00 Irish Summer Time (Europe/Dublin)'
  },
  { value: 'GMT+00:00 Greenwich Mean Time (GMT)', label: 'GMT+00:00 Greenwich Mean Time (GMT)' },
  {
    value: 'GMT–00:00 Eastern Greenland Summer Time (America/Scoresbysund)',
    label: 'GMT–00:00 Eastern Greenland Summer Time (America/Scoresbysund)'
  },
  {
    value: 'GMT–00:00 Azores Summer Time (Atlantic/Azores)',
    label: 'GMT–00:00 Azores Summer Time (Atlantic/Azores)'
  },
  {
    value: 'GMT–02:00 South Georgia Standard Time (Atlantic/South_Georgia)',
    label: 'GMT–02:00 South Georgia Standard Time (Atlantic/South_Georgia)'
  },
  {
    value: 'GMT–02:30 Newfoundland Daylight Time (America/St_Johns)',
    label: 'GMT–02:30 Newfoundland Daylight Time (America/St_Johns)'
  },
  {
    value: 'GMT–03:00 Brasilia Summer Time (America/Sao_Paulo)',
    label: 'GMT–03:00 Brasilia Summer Time (America/Sao_Paulo)'
  },
  {
    value: 'GMT–03:00 Argentina Time (America/Argentina/Buenos_Aires)',
    label: 'GMT–03:00 Argentina Time (America/Argentina/Buenos_Aires)'
  },
  {
    value: 'GMT–03:00 Chile Summer Time (America/Santiago)',
    label: 'GMT–03:00 Chile Summer Time (America/Santiago)'
  },
  {
    value: 'GMT–03:00 Atlantic Daylight Time (America/Halifax)',
    label: 'GMT–03:00 Atlantic Daylight Time (America/Halifax)'
  },
  {
    value: 'GMT–04:00 Atlantic Standard Time (America/Puerto_Rico)',
    label: 'GMT–04:00 Atlantic Standard Time (America/Puerto_Rico)'
  },
  {
    value: 'GMT–04:00 Atlantic Daylight Time (Atlantic/Bermuda)',
    label: 'GMT–04:00 Atlantic Daylight Time (Atlantic/Bermuda)'
  },
  {
    value: 'GMT–04:30 Venezuela Time (America/Caracas)',
    label: 'GMT–04:30 Venezuela Time (America/Caracas)'
  },
  {
    value: 'GMT–04:00 Eastern Daylight Time (America/Indiana/Indianapolis)',
    label: 'GMT–04:00 Eastern Daylight Time (America/Indiana/Indianapolis)'
  },
  {
    value: 'GMT–04:00 Eastern Daylight Time (America/New_York)',
    label: 'GMT–04:00 Eastern Daylight Time (America/New_York)'
  },
  {
    value: 'GMT–05:00 Colombia Time (America/Bogota)',
    label: 'GMT–05:00 Colombia Time (America/Bogota)'
  },
  { value: 'GMT–05:00 Peru Time (America/Lima)', label: 'GMT–05:00 Peru Time (America/Lima)' },
  {
    value: 'GMT–05:00 Eastern Standard Time (America/Panama)',
    label: 'GMT–05:00 Eastern Standard Time (America/Panama)'
  },
  {
    value: 'GMT–05:00 Central Daylight Time (America/Mexico_City)',
    label: 'GMT–05:00 Central Daylight Time (America/Mexico_City)'
  },
  {
    value: 'GMT–05:00 Central Daylight Time (America/Chicago)',
    label: 'GMT–05:00 Central Daylight Time (America/Chicago)'
  },
  {
    value: 'GMT–06:00 Central Standard Time (America/El_Salvador)',
    label: 'GMT–06:00 Central Standard Time (America/El_Salvador)'
  },
  {
    value: 'GMT–06:00 Mountain Daylight Time (America/Denver)',
    label: 'GMT–06:00 Mountain Daylight Time (America/Denver)'
  },
  {
    value: 'GMT–06:00 Mountain Standard Time (America/Mazatlan)',
    label: 'GMT–06:00 Mountain Standard Time (America/Mazatlan)'
  },
  {
    value: 'GMT–07:00 Mountain Standard Time (America/Phoenix)',
    label: 'GMT–07:00 Mountain Standard Time (America/Phoenix)'
  },
  {
    value: 'GMT–07:00 Pacific Daylight Time (America/Los_Angeles)',
    label: 'GMT–07:00 Pacific Daylight Time (America/Los_Angeles)'
  },
  {
    value: 'GMT–07:00 Pacific Daylight Time (America/Tijuana)',
    label: 'GMT–07:00 Pacific Daylight Time (America/Tijuana)'
  },
  {
    value: 'GMT–08:00 Pitcairn Standard Time (Pacific/Pitcairn)',
    label: 'GMT–08:00 Pitcairn Standard Time (Pacific/Pitcairn)'
  },
  {
    value: 'GMT–08:00 Alaska Daylight Time (America/Anchorage)',
    label: 'GMT–08:00 Alaska Daylight Time (America/Anchorage)'
  },
  {
    value: 'GMT–09:00 Gambier Time (Pacific/Gambier)',
    label: 'GMT–09:00 Gambier Time (Pacific/Gambier)'
  },
  {
    value: 'GMT–9:00 Hawaii-Aleutian Standard Time (America/Adak)',
    label: 'GMT–9:00 Hawaii-Aleutian Standard Time (America/Adak)'
  },
  {
    value: 'GMT–09:30 Marquesas Time (Pacific/Marquesas)',
    label: 'GMT–09:30 Marquesas Time (Pacific/Marquesas)'
  },
  {
    value: 'GMT–10:00 Hawaii-Aleutian Standard Time (Pacific/Honolulu)',
    label: 'GMT–10:00 Hawaii-Aleutian Standard Time (Pacific/Honolulu)'
  },
  { value: 'GMT–11:00 Niue Time (Pacific/Niue)', label: 'GMT–11:00 Niue Time (Pacific/Niue)' },
  {
    value: 'GMT–11:00 Samoa Standard Time (Pacific/Pago_Pago)',
    label: 'GMT–11:00 Samoa Standard Time (Pacific/Pago_Pago)'
  }
];

// how did you hear about ESP
export const HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS = [
  { value: 'Ethereum Blog', label: 'Ethereum Blog' },
  { value: 'Ethereum Community Events', label: 'Ethereum Community Events' },
  { value: 'Ethereum.org', label: 'Ethereum.org' },
  { value: 'ESP Newsletter', label: 'ESP Newsletter' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'Other team/projects in ecosystem', label: 'Other team/projects in ecosystem' },
  { value: 'Other', label: 'Other' }
];

export const HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE = [
  { value: 'Email received', label: 'Email received' },
  ...HOW_DID_YOU_HEAR_ABOUT_ESP_OPTIONS
];

// academic grants
export const APPLYING_AS_OPTIONS = [
  { value: 'An individual', label: 'An individual' },
  { value: 'A University', label: 'A University' },
  { value: 'A consortium of Universities', label: 'A consortium of Universities' },
  { value: 'A Think-Tank', label: 'A Think-Tank' },
  { value: 'A Research Center', label: 'A Research Center' },
  { value: 'Other', label: 'Other' }
];

// office hours
export const TEAM = 'Team';
export const OTHER = 'Other';
export const COMMUNITY_EVENT = 'Community event';
export const REASONS_FOR_MEETING = [
  'Project feedback or advice',
  'Questions about ESP',
  'Questions about applying for a grant',
  'How to contribute to Ethereum',
  'Other',
  ''
];

// API routes
export const API_OFFICE_HOURS = '/api/office-hours';
export const API_PROJECT_GRANTS = '/api/project-grants';
export const API_SMALL_GRANTS_PROJECT = '/api/small-grants/project';
export const API_SMALL_GRANTS_EVENT = '/api/small-grants/event';
export const API_ACADEMIC_GRANTS = '/api/academic-grants';
export const API_DEVCON_GRANTS = '/api/devcon-grants';
export const API_GRANTEE_FINANCE_ETH = '/api/grantee-finance/eth';
export const API_GRANTEE_FINANCE_DAI = '/api/grantee-finance/dai';
export const API_GRANTEE_FINANCE_FIAT = '/api/grantee-finance/fiat';
export const API_GRANTEE_FINANCE_URLS: GranteeFinanceAPIMap = {
  ETH: API_GRANTEE_FINANCE_ETH,
  DAI: API_GRANTEE_FINANCE_DAI,
  Fiat: API_GRANTEE_FINANCE_FIAT
};
