import { IVoteValueProps } from "./interface";
export const tagColorMap = {
  Cosmos: "rgba(156, 108, 255, 0.80)",
  "Software Update": "rgba(255, 139, 74, 0.80)",
  Stride: "rgba(233, 17, 121, 0.80)",
  Neutron: "#24684c",
};

export const bigSmallTextColorMap: IVoteValueProps = {
  YES: "#409F4E",
  NO: "rgba(190, 72, 58, 0.80)",
  ABSTAIN: "rgba(200, 136, 100, 0.80)",
  VETO: "rgba(212, 212, 212, 0.80)",
};

export const cosmosStatusMap = {
  PROPOSAL_STATUS_DEPOSIT_PERIOD: {
    pretty: "Deposit",
    bg: "skyblue",
  },
  /**
   * PROPOSAL_STATUS_VOTING_PERIOD - PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
   *  period.
   */
  PROPOSAL_STATUS_VOTING_PERIOD: {
    pretty: "Vote Now",
    bg: "#BC3D70",
  },
  /**
   * PROPOSAL_STATUS_PASSED - PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
   *  passed.
   */
  PROPOSAL_STATUS_PASSED: {
    pretty: "Passed",
    bg: "green",
  },
  /*
   * PROPOSAL_STATUS_REJECTED - PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
   *  been rejected.
   */
  PROPOSAL_STATUS_REJECTED: {
    pretty: "Rejected",
    bg: "red",
  },
  /**
   * PROPOSAL_STATUS_FAILED - PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
   *  failed.
   */
  PROPOSAL_STATUS_FAILED: {
    pretty: "Failed",
    bg: "orange",
  },
  UNRECOGNIZED: {
    pretty: "Unrecognised",
    bg: "gray",
  },
};

export const neutronStatusMap = {
  /// The proposal is open for voting.
  open: {
    pretty: "Vote Now",
    bg: "#BC3D70",
  },
  /// The proposal has been rejected.
  rejected: {
    pretty: "Rejected",
    bg: "red",
  },
  /// The proposal has been passed but has not been executed.
  passed: {
    pretty: "Passed",
    bg: "green",
  },
  /// The proposal has been passed and executed.
  executed: {
    pretty: "Executed",
    bg: "green",
  },
  /// The proposal has failed or expired and has been closed. A
  /// proposal deposit refund has been issued if applicable.
  closed: {
    pretty: "Closed",
    bg: "gray",
  },
  /// The proposal's execution failed.
  execution_failed: {
    pretty: "Failed",
    bg: "orange",
  },
};

export const assetChainMap = {
  Cosmos: {
    symbol: "ATOM",
    denom: "uatom",
  },
  Stride: {
    symbol: "STRD",
    denom: "ustrd",
  },
  Neutron: {
    symbol: "NTRN",
    denom: "untrn",
  },
};

export const prices = [
  [1695032451660, 7.31806830648303],
  [1695032710458, 7.336175138521778],
  [1695033014469, 7.389168806366741],
  [1695033345838, 7.408702435401176],
  [1695033688608, 7.418419311236714],
  [1695033926248, 7.390377658159149],
  [1695034271900, 7.384884761551235],
  [1695034530009, 7.389639708589142],
  [1695034860517, 7.366802144933744],
  [1695035148469, 7.353180913068943],
  [1695035463428, 7.334122753787165],
  [1695035754395, 7.352919243882125],
  [1695036073879, 7.3349984185139645],
  [1695036350266, 7.345271097071593],
  [1695036668279, 7.344759440223707],
  [1695036915901, 7.3280587521974585],
  [1695037219952, 7.330717989315511],
  [1695037509092, 7.330522797058663],
  [1695037809538, 7.3492308037009835],
  [1695038128566, 7.350511118336444],
  [1695038502904, 7.362506836541047],
  [1695038760350, 7.3844528031816115],
  [1695039008553, 7.3737433570712465],
  [1695039328455, 7.376580182674302],
  [1695039670690, 7.3821546708998245],
  [1695039922004, 7.4042753732781454],
  [1695040214402, 7.419499906125162],
  [1695040504077, 7.430782869894413],
  [1695040802212, 7.427465332653124],
  [1695041111621, 7.417664341211272],
  [1695041431372, 7.419183241678236],
  [1695041740735, 7.4053461738156265],
  [1695042092098, 7.4643290220634],
  [1695042352500, 7.461857787380128],
  [1695042672235, 7.415689202633148],
  [1695042943617, 7.411067050937843],
  [1695043241047, 7.407613680157865],
  [1695043542061, 7.409250004910479],
  [1695043850346, 7.400465196571723],
  [1695044143776, 7.396244633996319],
  [1695044493668, 7.396236328312741],
  [1695044709498, 7.374673286863774],
  [1695045010404, 7.378861954378007],
  [1695045309240, 7.380926196867111],
  [1695045620311, 7.382998164128895],
  [1695045943066, 7.408609166454922],
  [1695046267749, 7.382730087414885],
  [1695046552438, 7.400856555896307],
  [1695046863345, 7.416028669505167],
  [1695047108623, 7.4165983700488205],
  [1695047418030, 7.421512068158392],
  [1695047744807, 7.411450841484254],
  [1695048000980, 7.416760668408707],
  [1695048298962, 7.417155972679945],
  [1695048669066, 7.413976031652895],
  [1695048907088, 7.42503674055295],
  [1695049239028, 7.419791862693757],
  [1695049508913, 7.417521072542574],
  [1695049881795, 7.422405508883297],
  [1695050155279, 7.418536017282994],
  [1695050452717, 7.420237128611428],
  [1695050714880, 7.406886403325036],
  [1695051052548, 7.404404108711394],
  [1695051299055, 7.407349737615381],
  [1695051638487, 7.3939060706021165],
  [1695051949637, 7.409593707118131],
  [1695052250406, 7.392069580368955],
  [1695052540228, 7.384350977769051],
  [1695052849317, 7.387587037308255],
  [1695053097171, 7.401188265625175],
  [1695053436866, 7.393717021207887],
  [1695053724197, 7.374353904272547],
  [1695054023384, 7.366031860458418],
  [1695054312285, 7.371863195525989],
  [1695054683627, 7.377225178723855],
  [1695054961848, 7.383487064534609],
  [1695055236876, 7.389800814566775],
  [1695055537116, 7.425702767785525],
  [1695055844394, 7.428818343725006],
  [1695056109781, 7.424415099724538],
  [1695056431863, 7.417413263558211],
  [1695056712307, 7.42166062310833],
  [1695057075312, 7.40376708844336],
  [1695057353589, 7.406493595082097],
  [1695057621476, 7.406527083448608],
  [1695057922467, 7.408323990092618],
  [1695058250650, 7.37250396638629],
  [1695058498301, 7.381169681500319],
  [1695058876586, 7.320355462862819],
  [1695059151294, 7.327528902567225],
  [1695059462910, 7.3321353408728935],
  [1695059751072, 7.333386013610066],
  [1695060061537, 7.304488942517608],
  [1695060370786, 7.317415225811675],
  [1695060671458, 7.318136815633204],
  [1695060961342, 7.3178892230415915],
  [1695061270765, 7.320273150360344],
  [1695061559288, 7.305962500298482],
  [1695061859912, 7.300961084545454],
  [1695062138248, 7.2887521335305285],
  [1695062475128, 7.291180033271031],
  [1695062742779, 7.281888750218744],
  [1695063031882, 7.2896133460617465],
  [1695063338911, 7.28658227217016],
  [1695063686449, 7.276649494842584],
  [1695063955400, 7.281810228606864],
  [1695064203282, 7.287873103677775],
  [1695064496933, 7.295259162723166],
  [1695064805988, 7.290405256364874],
  [1695065146694, 7.292403723387652],
  [1695065463763, 7.30939341468576],
  [1695065748397, 7.315382347080304],
  [1695066076185, 7.347743547546661],
  [1695066344485, 7.357356672405455],
  [1695066674325, 7.356758028994522],
  [1695066899677, 7.353488738326231],
  [1695067212935, 7.366580672138266],
  [1695067499216, 7.3488254498978485],
  [1695067820242, 7.336279492919111],
  [1695068118851, 7.337534369361168],
  [1695068432521, 7.332114883349565],
  [1695068730932, 7.327862814806028],
  [1695069043073, 7.3251879278617835],
  [1695069361998, 7.326642034138581],
  [1695069598144, 7.328627528952295],
  [1695069908329, 7.329471981020371],
  [1695070218588, 7.330027259842339],
  [1695070505243, 7.330305136284654],
  [1695070827614, 7.3304335564407905],
  [1695071114775, 7.3286294410753134],
  [1695071403698, 7.322767693225767],
  [1695071705680, 7.335680099330904],
  [1695072014653, 7.3456521442837],
  [1695072308409, 7.339778092573886],
  [1695072618435, 7.345283625429487],
  [1695072911014, 7.343165099725637],
  [1695073202555, 7.345835505783403],
  [1695073499857, 7.349584683125286],
  [1695073804330, 7.347014246240856],
  [1695074145220, 7.345100902946384],
  [1695074456737, 7.362444170481223],
  [1695074752353, 7.360889736006477],
  [1695075062806, 7.366170439379703],
  [1695075350623, 7.365433963769154],
  [1695075658427, 7.367479090343436],
  [1695075949889, 7.367056557767327],
  [1695076278456, 7.369752142103447],
  [1695076559686, 7.368498226827679],
  [1695076795378, 7.359053956244465],
  [1695077095536, 7.368800361733417],
  [1695077393860, 7.374326950272678],
  [1695077696134, 7.387064801886566],
  [1695077996015, 7.391435309477146],
  [1695078345710, 7.389584593420915],
  [1695078666938, 7.388229386422401],
  [1695078946157, 7.384303785757117],
  [1695079263064, 7.366164323164547],
  [1695079541949, 7.362438317612675],
  [1695079875093, 7.359644466053014],
  [1695080141810, 7.360241302851225],
  [1695080441831, 7.355770302525997],
  [1695080742757, 7.358942110986793],
  [1695081023744, 7.363842981225607],
  [1695081337214, 7.368757657877057],
  [1695081708261, 7.370496807745874],
  [1695081947599, 7.36742867878756],
  [1695082208557, 7.363999121168029],
  [1695082507059, 7.355346803109742],
  [1695082816080, 7.342308960043073],
  [1695083104043, 7.332382533665423],
  [1695083434248, 7.331688711069404],
  [1695083743730, 7.347052349204338],
  [1695084094248, 7.353555444487604],
  [1695084349430, 7.352417882487024],
  [1695084636020, 7.348267362236572],
  [1695084933877, 7.345487642670259],
  [1695085276414, 7.34582391913589],
  [1695085544268, 7.339235659145662],
  [1695085892154, 7.356360432554118],
  [1695086094863, 7.358717602322399],
  [1695086407328, 7.3661103890996396],
  [1695086733430, 7.374692147913017],
  [1695087032780, 7.368357883896017],
  [1695087363265, 7.372174928761947],
  [1695087668873, 7.359001137504728],
  [1695087957374, 7.362982544623173],
  [1695088259146, 7.357573169576578],
  [1695088558112, 7.355695757352363],
  [1695088910305, 7.353013708433153],
  [1695089155714, 7.3461705034629485],
  [1695089433086, 7.348983758281131],
  [1695089731028, 7.351132502040687],
  [1695090028457, 7.347454659015011],
  [1695090328044, 7.3459177617784475],
  [1695090654642, 7.344490644683533],
  [1695090922650, 7.338426568227156],
  [1695091233018, 7.3334460956167025],
  [1695091517263, 7.338035524226282],
  [1695091837668, 7.333728143785951],
  [1695092095212, 7.33143412246894],
  [1695092396509, 7.346281555788972],
  [1695092702440, 7.348919927291251],
  [1695092992929, 7.350069700647341],
  [1695093303036, 7.340661849831769],
  [1695093605843, 7.333298660557092],
  [1695093913788, 7.327514559064771],
  [1695094216179, 7.3283746663527785],
  [1695094524746, 7.3346310580349385],
  [1695094841550, 7.333131399344028],
  [1695095108470, 7.330329826730112],
  [1695095419898, 7.329881520316219],
  [1695095717361, 7.330845768400455],
  [1695096019761, 7.330638382475373],
  [1695096298970, 7.3287906635326525],
  [1695096597862, 7.326002228587729],
  [1695096917683, 7.33382248995914],
  [1695097258328, 7.326053694629235],
  [1695097529397, 7.3258684369843525],
  [1695097822494, 7.3240106236033125],
  [1695098122497, 7.323380236052475],
  [1695098443359, 7.331072805438986],
  [1695098720552, 7.320411339390134],
  [1695099020076, 7.3244050565672545],
  [1695099317462, 7.336495616537499],
  [1695099633046, 7.332402229975584],
  [1695099924943, 7.335172723261232],
  [1695100204586, 7.338881032509632],
  [1695100506571, 7.337871202946282],
  [1695100825185, 7.33421823676114],
  [1695101116157, 7.32760469291318],
  [1695101405940, 7.325091615889176],
  [1695101723336, 7.31874576761193],
  [1695102006979, 7.311811701450785],
  [1695102305214, 7.307642273032869],
  [1695102623760, 7.314677912329747],
  [1695102912071, 7.30928019136538],
  [1695103212173, 7.299118650514006],
  [1695103512278, 7.294641956274208],
  [1695103823343, 7.28510054299589],
  [1695104105321, 7.282446511204796],
  [1695104412614, 7.282768274797282],
  [1695104711545, 7.278270988709999],
  [1695104991903, 7.275769448555491],
  [1695105295603, 7.279945056762971],
  [1695105591715, 7.283340434687637],
  [1695105899672, 7.297547002259587],
  [1695106200554, 7.2400083217594995],
  [1695106497190, 7.240563838540592],
  [1695106794648, 7.241916374247757],
  [1695107124973, 7.237389496763655],
  [1695107423777, 7.234951073441153],
  [1695107750898, 7.234338965493637],
  [1695108079701, 7.2278742502292195],
  [1695108354695, 7.229403491812128],
  [1695108647252, 7.236752852773877],
  [1695108936652, 7.2424805486358546],
  [1695109244325, 7.240241998102473],
  [1695109541232, 7.231052357118158],
  [1695109838578, 7.231314523982992],
  [1695110159502, 7.2314117067478865],
  [1695110457370, 7.2292894117771285],
  [1695110733920, 7.223135252209491],
  [1695111046957, 7.224003675718192],
  [1695111339414, 7.224884332506222],
  [1695111636843, 7.2310913904975616],
  [1695111939997, 7.24240088425147],
  [1695112244683, 7.263521930231415],
  [1695112543954, 7.265958764331718],
  [1695112883987, 7.290095307972101],
  [1695113099238, 7.307232859561576],
  [1695113402099, 7.330184992320232],
  [1695113700075, 7.332491948336825],
  [1695114003681, 7.346135256132929],
  [1695114354414, 7.40372155657521],
  [1695114609114, 7.384514058465077],
  [1695114906366, 7.383729327854211],
  [1695115234529, 7.383000420646876],
  [1695115295364, 7.384623642863135],
  [1695115512609, 7.397451485907007],
  [1695115814566, 7.405323008784144],
  [1695116097342, 7.415580188910421],
  [1695116397626, 7.4208487028615435],
  [1695116698231, 7.427149382963196],
  [1695117043570, 7.397124942729158],
  [1695117298783, 7.400163253763671],
  [1695117607113, 7.396737063194305],
  [1695117967865, 7.39512414932161],
  [1695118276906, 7.39224411799472],
  [1695118553208, 7.381760123110793],
  [1695118594000, 7.390550368717274],
];
