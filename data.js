const R2 = 'https://pub-7ec8eda6eaf64b8f846c26d12ee3eb17.r2.dev';

const PARTITE = [
  {
    id: '1_POLLINO-AGROPOLI',
    num: 1,
    label: 'Pollino vs Agropoli',
    photos: ["DSC07336 copia.jpg","DSC07343 copia.jpg","DSC07354 copia.jpg","DSC07359 copia.jpg","DSC07363 copia.jpg","DSC07370 copia.jpg","DSC07371 copia.jpg","DSC07378 copia.jpg","DSC07379 copia.jpg","DSC07380 copia.jpg","DSC07382 copia.jpg","DSC07385 copia.jpg","DSC07390 copia.jpg","DSC07409 copia.jpg","DSC07410 copia.jpg","DSC07426 copia.jpg","DSC07434 copia.jpg","DSC07439 copia.jpg","DSC07446 copia.jpg","DSC07459 copia.jpg","DSC07471 copia.jpg","DSC07524 copia.jpg","DSC07532 copia.jpg","DSC07611 copia.jpg","DSC07619 copia.jpg","DSC07645 copia.jpg","DSC07680 copia.jpg","DSC07697 copia.jpg","DSC07701 copia.jpg","DSC07704 copia.jpg","DSC07706 copia.jpg","DSC07712 copia.jpg","DSC07725 copia.jpg","DSC07731 copia.jpg","DSC07744 copia.jpg","DSC07752 copia.jpg","DSC07798 copia.jpg","DSC07803 copia.jpg","DSC07814 copia.jpg","DSC07831 copia.jpg","DSC07847 copia.jpg","DSC07870 copia.jpg","DSC07874 copia.jpg","DSC07889 copia.jpg","DSC07901 copia.jpg","DSC07912 copia.jpg","DSC07927 copia.jpg","DSC07960 copia.jpg","DSC08009 copia.jpg","DSC08028 copia.jpg","DSC08035 copia.jpg","DSC08058 copia.jpg","DSC08074 copia.jpg","DSC08083 copia.jpg","DSC08125 copia.jpg","DSC08148 copia.jpg","DSC08176 copia.jpg","DSC08178 copia.jpg"]
  },
  {
    id: '2_AGROPOLI-FORIO',
    num: 2,
    label: 'Agropoli vs Forio',
    photos: ["DSC08220 copia.jpg","DSC08225 copia.jpg","DSC08230 copia.jpg","DSC08233 copia.jpg","DSC08237 copia.jpg","DSC08241 copia.jpg","DSC08245 copia.jpg","DSC08246 copia.jpg","DSC08247 copia.jpg","DSC08253 copia.jpg","DSC08266 copia.jpg","DSC08275 copia.jpg","DSC08284 copia.jpg","DSC08287 copia.jpg","DSC08311 copia.jpg","DSC08335 copia.jpg","DSC08340 copia.jpg","DSC08372 copia.jpg","DSC08384 copia.jpg","DSC08391 copia.jpg","DSC08399 copia.jpg","DSC08416 copia.jpg","DSC08442 copia.jpg","DSC08490 copia.jpg","DSC08541 copia.jpg","DSC08577 copia.jpg","DSC08595 copia.jpg","DSC08599 copia.jpg","DSC08611 copia.jpg","DSC08691 copia.jpg","DSC08696 copia.jpg","DSC08710 copia.jpg","DSC08770 copia.jpg","DSC08773 copia.jpg","DSC08794 copia.jpg","DSC08814 copia.jpg","DSC08827 copia.jpg","DSC08832 copia.jpg","DSC08836 copia.jpg","DSC08841 copia.jpg","DSC08847 copia.jpg"]
  },
  {
    id: '3_AGROPOLI-CERCOLA',
    num: 3,
    label: 'Agropoli vs Cercola',
    photos: ["DSC029 copia.jpg","DSC049 copia.jpg","DSC057 copia.jpg","DSC074 copia.jpg","DSC091 copia.jpg","DSC093 copia.jpg","DSC123 copia.jpg","DSC150 copia.jpg","DSC158 copia.jpg","DSC160 copia.jpg","DSC180 copia.jpg","DSC183 copia.jpg","DSC194 copia.jpg","DSC204 copia.jpg","DSC241 copia.jpg","DSC257 copia.jpg","DSC264 copia.jpg","DSC275 copia.jpg","DSC286 copia.jpg","DSC338 copia.jpg","DSC363 copia.jpg","DSC375 copia.jpg","DSC388 copia.jpg","DSC422 copia.jpg","DSC440 copia.jpg","DSC449 copia.jpg","DSC451 copia.jpg","DSC466 copia.jpg","DSC470 copia.jpg","DSC474 copia.jpg","DSC482 copia.jpg","DSC495 copia.jpg","DSC502 copia.jpg","DSC504 copia.jpg"]
  },
  {
    id: '4_AGROPOLI-MATESE',
    num: 4,
    label: 'Agropoli vs Matese',
    photos: ["DSC03409 copia.jpg","DSC03410 copia.jpg","DSC03415 copia.jpg","DSC03419 copia.jpg","DSC03421 copia.jpg","DSC03425 copia.jpg","DSC03442 copia.jpg","DSC03454 copia.jpg","DSC03482 copia.jpg","DSC03493 copia.jpg","DSC03497 copia.jpg","DSC03548 copia.jpg","DSC03552 copia.jpg","DSC03586 copia.jpg","DSC03590 copia.jpg","DSC03628 copia.jpg","DSC03639 copia.jpg","DSC03642 copia.jpg","DSC03652 copia.jpg","DSC03675 copia.jpg","DSC03686 copia.jpg","DSC03769 copia.jpg","DSC03788 copia.jpg","DSC03803 copia.jpg","DSC03835 copia.jpg","DSC03875 copia.jpg","DSC03884 copia.jpg","DSC03929 copia.jpg","DSC03932 copia.jpg","DSC03938 copia.jpg","DSC03941 copia.jpg"]
  },
  {
    id: '5_AGROPOLI-SAN MICHELE',
    num: 5,
    label: 'Agropoli vs San Michele',
    photos: ["DSC03980 copia.jpg","DSC04005 copia.jpg","DSC04042 copia.jpg","DSC04046 copia.jpg","DSC04060 copia.jpg","DSC04079 copia.jpg","DSC04088 copia.jpg","DSC04100 copia.jpg","DSC04104 copia.jpg","DSC04154 copia.jpg","DSC04171 copia.jpg","DSC04174 copia.jpg","DSC04181 copia.jpg","DSC04191 copia.jpg","DSC04198 copia.jpg","DSC04217 copia.jpg","DSC04229 copia.jpg","DSC04235 copia.jpg","DSC04246 copia.jpg","DSC04247 copia.jpg","DSC04259 copia.jpg","DSC04308 copia.jpg","DSC04313 copia.jpg","DSC04317 copia.jpg","DSC04332 copia.jpg","DSC04359 copia.jpg","DSC04368 copia.jpg","DSC04386 copia.jpg","DSC04390 copia.jpg","DSC04404 copia.jpg","DSC04411 copia.jpg","DSC04426 copia.jpg","DSC04449 copia.jpg","DSC04467 copia.jpg","DSC04473 copia.jpg","DSC04489 copia.jpg","DSC04505 copia.jpg"]
  },
  {
    id: '6_AGROPOLI - PORTICI',
    num: 6,
    label: 'Agropoli vs Portici',
    photos: ["DSC05371 copia.jpg","DSC05432 copia.jpg","DSC05459 copia.jpg","DSC05472 copia.jpg","DSC05494 copia.jpg","DSC05506 copia.jpg","DSC05528 copia.jpg","DSC05551 copia.jpg","DSC05558 copia.jpg","DSC05564 copia.jpg","DSC05576 copia.jpg","DSC05646 copia.jpg","DSC05657 copia.jpg","DSC05666 copia.jpg","DSC05679 copia.jpg","DSC05694 copia.jpg","DSC05709 copia.jpg","DSC05719 copia.jpg","DSC05727 copia.jpg","DSC05737 copia.jpg","DSC05803 copia.jpg","DSC05896 copia.jpg","DSC05899 copia.jpg","DSC05901 copia.jpg","DSC05924 copia.jpg","DSC05968 copia.jpg","DSC06063 copia.jpg","DSC06068 copia.jpg","DSC06082 copia.jpg","DSC06087 copia.jpg"]
  },
  {
    id: '7_AGROPOLI - CASAPULLA',
    num: 7,
    label: 'Agropoli vs Casapulla',
    photos: ["DSC06484 copia.jpg","DSC06496 copia.jpg","DSC06501 copia.jpg","DSC06503 copia.jpg","DSC06505 copia.jpg","DSC06507 copia.jpg","DSC06510 copia.jpg","DSC06512 copia.jpg","DSC06515 copia.jpg","DSC06520 copia.jpg","DSC06554 copia.jpg","DSC06557 copia.jpg","DSC06565 copia.jpg","DSC06570 copia.jpg","DSC06597 copia.jpg","DSC06611 copia.jpg","DSC06616-Modifica copia.jpg","DSC06643 copia.jpg","DSC06698 copia.jpg","DSC06710 copia.jpg","DSC06714 copia.jpg","DSC06722-Modifica copia.jpg","DSC06735 copia.jpg","DSC06749 copia.jpg","DSC06769 copia.jpg","DSC06781 copia.jpg","DSC06812 copia.jpg","DSC06845 copia.jpg","DSC06856 copia.jpg","DSC06871 copia.jpg","DSC06905 copia.jpg","DSC06911 copia.jpg","DSC06963 copia.jpg","DSC06969 copia.jpg","DSC07021 copia.jpg","DSC07042 copia.jpg","DSC07072 copia.jpg","DSC07094 copia.jpg","DSC07100 copia.jpg","DSC07104 copia.jpg","DSC07108 copia.jpg","DSC07113 copia.jpg"]
  },
  {
    id: '8_AGROPOLI - SARNO',
    num: 8,
    label: 'Agropoli vs Sarno',
    photos: ["PEP_8768 copia.jpg","PEP_8770 copia.jpg","PEP_8799 copia.jpg","PEP_8812 copia.jpg","PEP_8831 copia.jpg","PEP_8836 copia.jpg","PEP_8841 copia.jpg","PEP_8852 copia.jpg","PEP_8869 copia.jpg","PEP_8871 copia.jpg","PEP_8882 copia.jpg","PEP_8889 copia.jpg","PEP_8891 copia.jpg","PEP_8894 copia.jpg","PEP_8898 copia.jpg","PEP_8905 copia.jpg","PEP_8910 copia.jpg","PEP_8914 copia.jpg","PEP_8938 copia.jpg","PEP_8949 copia.jpg","PEP_8961 copia.jpg","PEP_8969 copia.jpg","PEP_8990 copia.jpg","PEP_9013 copia.jpg","PEP_9022 copia.jpg","PEP_9028 copia.jpg","PEP_9031 copia.jpg","PEP_9033 copia.jpg","PEP_9048 copia.jpg","PEP_9060 copia.jpg","PEP_9086 copia.jpg","PEP_9121 copia.jpg","PEP_9126 copia.jpg","PEP_9127 copia.jpg","PEP_9136 copia.jpg","PEP_9145 copia.jpg","PEP_9146 copia.jpg","PEP_9154 copia.jpg","PEP_9166 copia.jpg","PEP_9170 copia.jpg","PEP_9180 copia.jpg","PEP_9202 copia.jpg","PEP_9215 copia.jpg","PEP_9220 copia.jpg","PEP_9229 copia.jpg","PEP_9233 copia.jpg","PEP_9248 copia.jpg","PEP_9257 copia.jpg","PEP_9279 copia.jpg","PEP_9302 copia.jpg","PEP_9311 copia.jpg","PEP_9325 copia.jpg","PEP_9330 copia.jpg"]
  },
  {
    id: '9_AGROPOLI - POLLINO',
    num: 9,
    label: 'Agropoli vs Pollino',
    photos: ["DSC07497 copia.jpg","DSC07505 copia.jpg","DSC07506 copia.jpg","DSC07517 copia.jpg","DSC07521 copia.jpg","DSC07546 copia.jpg","DSC07558 copia.jpg","DSC07560 copia.jpg","DSC07570 copia.jpg","DSC07577 copia.jpg","DSC07589 copia.jpg","DSC07601 copia.jpg","DSC07604 copia.jpg","DSC07622 copia.jpg","DSC07663 copia.jpg","DSC07666 copia.jpg","DSC07669 copia.jpg","DSC07674 copia.jpg","DSC07688 copia.jpg","DSC07700 copia.jpg","DSC07711 copia.jpg","DSC07716 copia.jpg","DSC07748 copia.jpg","DSC07758 copia.jpg","DSC07764 copia.jpg","DSC07769 copia.jpg","DSC07781 copia.jpg","DSC07809 copia.jpg","DSC07811 copia.jpg","DSC07816 copia.jpg","DSC07828 copia.jpg","DSC07849 copia.jpg","DSC07855 copia.jpg","DSC07869 copia.jpg","DSC07879 copia.jpg","DSC07893 copia.jpg","DSC07899 copia.jpg","DSC07925 copia.jpg","DSC07930 copia.jpg","DSC07946 copia.jpg","DSC07971 copia.jpg","DSC07977 copia.jpg","DSC07989 copia.jpg","DSC08007 copia.jpg","DSC08025 copia.jpg","DSC08034 copia.jpg","DSC08062 copia.jpg","DSC08075 copia.jpg","DSC08079 copia.jpg"]
  },
  {
    id: '10_AGROPOLI - POZZUOLI',
    num: 10,
    label: 'Agropoli vs Pozzuoli',
    photos: ["DSC08207 copia.jpg","DSC08208 copia.jpg","DSC08215 copia.jpg","DSC08221 copia.jpg","DSC08228 copia.jpg","DSC08232 copia.jpg","DSC08238 copia.jpg","DSC08241 copia.jpg","DSC08244 copia.jpg","DSC08247 copia.jpg","DSC08254 copia.jpg","DSC08265 copia.jpg","DSC08272 copia.jpg","DSC08285 copia.jpg","DSC08320 copia.jpg","DSC08333 copia.jpg","DSC08355 copia.jpg","DSC08366 copia.jpg","DSC08371 copia.jpg","DSC08374 copia.jpg","DSC08389 copia.jpg","DSC08400 copia.jpg","DSC08404 copia.jpg","DSC08430 copia.jpg","DSC08437 copia.jpg","DSC08442 copia.jpg","DSC08458 copia.jpg","DSC08466 copia.jpg","DSC08480 copia.jpg","DSC08483 copia.jpg","DSC08489 copia.jpg","DSC08491 copia.jpg","DSC08501 copia.jpg","DSC08504 copia.jpg","DSC08509 copia.jpg","DSC08513 copia.jpg","DSC08518 copia.jpg","DSC08528 copia.jpg","DSC08551 copia.jpg","DSC08559 copia.jpg","DSC08574 copia.jpg","DSC08589 copia.jpg","DSC08596 copia.jpg","DSC08603 copia.jpg","DSC08610 copia.jpg","DSC08613 copia.jpg","DSC08645 copia.jpg","DSC08648 copia.jpg","DSC08652 copia.jpg","DSC08679 copia.jpg"]
  },
  {
    id: '11_AGROPOLI - SANT_ANTIMO',
    num: 11,
    label: "Agropoli vs Sant'Antimo",
    photos: ["DSC09232 copia.jpg","DSC09235 copia.jpg","DSC09241 copia.jpg","DSC09244 copia.jpg","DSC09265 copia.jpg","DSC09268 copia.jpg","DSC09269 copia.jpg","DSC09275 copia.jpg","DSC09279 copia.jpg","DSC09281 copia.jpg","DSC09285 copia.jpg","DSC09288 copia.jpg","DSC09294 copia.jpg","DSC09298 copia.jpg","DSC09301 copia.jpg","DSC09311 copia.jpg","DSC09318 copia.jpg","DSC09332 copia.jpg","DSC09353 copia.jpg","DSC09356 copia.jpg","DSC09363 copia.jpg","DSC09384 copia.jpg","DSC09405 copia.jpg","DSC09421 copia.jpg","DSC09425 copia.jpg","DSC09436 copia.jpg","DSC09468 copia.jpg","DSC09473 copia.jpg","DSC09492 copia.jpg","DSC09500 copia.jpg","DSC09507 copia.jpg","DSC09552 copia.jpg","DSC09557 copia.jpg","DSC09565 copia.jpg","DSC09574 copia.jpg","DSC09583 copia.jpg","DSC09586 copia.jpg","DSC09600 copia.jpg","DSC09642 copia.jpg","DSC09645 copia.jpg","DSC09663 copia.jpg","DSC09686 copia.jpg","DSC09687 copia.jpg","DSC09736 copia.jpg","DSC09742 copia.jpg","DSC09769 copia.jpg","DSC09774 copia.jpg","DSC09785 copia.jpg","DSC09796 copia.jpg","DSC09808 copia.jpg","DSC09828 copia.jpg"]
  },
  {
    id: '12_AGROPOLI - MUGNANO',
    num: 12,
    label: 'Agropoli vs Mugnano',
    photos: ["DSC00195 copia.jpg","DSC00200 copia.jpg","DSC00201 copia.jpg","DSC00210 copia.jpg","DSC00214 copia.jpg","DSC00219 copia.jpg","DSC00240 copia.jpg","DSC00241 copia.jpg","DSC00248 copia.jpg","DSC00257 copia.jpg","DSC00264 copia.jpg","DSC00268 copia.jpg","DSC00271 copia.jpg","DSC00273 copia.jpg","DSC00282 copia.jpg","DSC00288 copia.jpg","DSC00293 copia.jpg","DSC00313 copia.jpg","DSC00318 copia.jpg","DSC00326 copia.jpg","DSC00332 copia.jpg","DSC00347 copia.jpg","DSC00374 copia.jpg","DSC00376 copia.jpg","DSC00438 copia.jpg","DSC00451 copia.jpg","DSC00457 copia.jpg","DSC00475 copia.jpg","DSC00492 copia.jpg","DSC00501 copia.jpg","DSC00506 copia.jpg","DSC00524 copia.jpg","DSC00530 copia.jpg","DSC00533 copia.jpg","DSC00552 copia.jpg","DSC00558 copia.jpg"]
  },
  {
    id: '13_AGROPOLI - MUGNANO',
    num: 13,
    label: 'Agropoli vs Solofra',
    photos: ["DSC00703 copia.jpg","DSC00707 copia.jpg","DSC00712 copia.jpg","DSC00715 copia.jpg","DSC00733 copia.jpg","DSC00738 copia.jpg","DSC00742 copia.jpg","DSC00752 copia.jpg","DSC00755 copia.jpg","DSC00766 copia.jpg","DSC00778 copia.jpg","DSC00804 copia.jpg","DSC00828 copia.jpg","DSC00831 copia.jpg","DSC00844 copia.jpg","DSC00851 copia.jpg","DSC00863 copia.jpg","DSC00894 copia.jpg","DSC00913 copia.jpg","DSC00922 copia.jpg","DSC00925 copia.jpg","DSC00930 copia.jpg","DSC00948 copia.jpg","DSC00958 copia.jpg","DSC00961 copia.jpg","DSC00969 copia.jpg","DSC01019 copia.jpg","DSC01033 copia.jpg","DSC01042 copia.jpg","DSC01078 copia.jpg","DSC01082 copia.jpg","DSC01090 copia.jpg","DSC01125 copia.jpg","DSC01143 copia.jpg","DSC01151 copia.jpg","DSC01155 copia.jpg","DSC01164 copia.jpg","DSC01172 copia.jpg","DSC01182 copia.jpg","DSC01198 copia.jpg","DSC01204 copia.jpg","DSC01213 copia.jpg"]
  },
  {
    id: '14_AGROPOLI - MONDRAGONE',
    num: 14,
    label: 'Agropoli vs Mondragone',
    photos: ["DSC01399.jpg","DSC01401.jpg","DSC01412.jpg","DSC01424.jpg","DSC01427.jpg","DSC01432.jpg","DSC01437.jpg","DSC01447.jpg","DSC01495.jpg","DSC01513.jpg","DSC01516.jpg","DSC01534.jpg","DSC01535.jpg","DSC01537.jpg","DSC01544.jpg","DSC01549.jpg","DSC01560.jpg","DSC01565.jpg","DSC01582.jpg","DSC01587.jpg","DSC01594.jpg","DSC01616.jpg","DSC01636.jpg","DSC01639.jpg","DSC01656.jpg","DSC01659.jpg","DSC01669.jpg","DSC01673.jpg","DSC01681.jpg","DSC01684.jpg","DSC01709.jpg","DSC01717.jpg","DSC01721.jpg","DSC01723.jpg","DSC01736.jpg","DSC01758.jpg","DSC01787.jpg","DSC01807.jpg","DSC01813.jpg","DSC01815.jpg","DSC01840.jpg","DSC01853.jpg","DSC01890.jpg","DSC01930.jpg","DSC01937.jpg","DSC01942.jpg"]
  }
];
