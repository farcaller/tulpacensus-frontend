export interface Value {
  key: string;
  title: string;
}

export interface GenericQuestion {
  type: string;
  key: string;
  title: string;
  help?: string;
  morehelp?: string;
  showif?: string;
}

export interface NumberQuestion extends GenericQuestion {
  type: "number";
}

export interface PickManyQuestion extends GenericQuestion {
  type: "pick-many";
  other?: boolean;
  values: Value[];
}

export interface PickOneQuestion extends GenericQuestion {
  type: "pick-one";
  other?: boolean;
  values: Value[];
}

export interface CountryQuestion extends GenericQuestion {
  type: "country";
}

export interface StringQuestion extends GenericQuestion {
  type: "string";
}

export type QuestionsEnum = (NumberQuestion|PickManyQuestion|PickOneQuestion
    |CountryQuestion|StringQuestion);

export interface QuestionsPage {
  title: string;
  key: string;
  help?: string;
  questions: QuestionsEnum[];
}

export type QuestionsSet = { [Key: string]: QuestionsPage };

export const Questions: QuestionsSet = {
  intro: {
    title: "Intro",
    key: "intro",
    help: "This set of questions will let us assess the generic interest in tulpamancy from the community. " +
          "Note, that there is no option for \"no tulpas\" this year. The statistics of 2015 made it clear " +
          "we are only interested in people that do have tulpas already or are creating one.",
    questions: [
      {
        type: "number",
        key: "personalities_count",
        title: "How many total personalities do you have, incuding yourself?",
        help: "Include sentient tulpas, and tulpas that you just started creating.",
        morehelp: "Include yourself too!",
      },
      {
        type: "pick-many",
        key: "initial_interests",
        other: true,
        title: "What about tulpas interested you to start?",
        values: [
          {key: "friends", title: "Companionship (friends): wanted to create one or more tulpas to establish a friendship bond" },
          {key: "family", title: "Companionship (family): wanted to create one or more tulpas to establish a family bond (siblings, parents, etc)" },
          {key: "lovers", title: "Companionship (lovers): wanted to create one or more tulpas to engage in romance" },
          {key: "curiosity", title: "Curiosity: wanted to see if you could do it" },
          {key: "skepticism", title: "Skepticism: strongly doubted tulpas were a possibility and decided to try for yourself" },
          {key: "self_improvement", title: "Self-improvement: interest in possible benefits (enhanced memory recall, cooperation, second opinion, etc.)" },
          {key: "science", title: "Science: wanted to try and study the phenomenon" },
          {key: "fascination", title: "Fascination: tulpas sounded very interesting to the point of fascination" },
          {key: "selfhelp", title: "Self-help: needed help in a dire situation like suicide, or to deal with depression" },
          {key: "community", title: "Community appeal: the community seemed interesting and/or friendly" },
          {key: "friend", title: "Friend appeal: you discovered tulpas from a friend or a friend of yours is a tulpa and that motivated you to start" },
          {key: "metaphysics", title: "Metaphysics: you were a practitioner or believer of metaphysics that are related, loosely or not, with tulpas" },
          {key: "had_a_tulpa", title: "Pre-existing tulpa: already had a tulpa before finding out about the word and the community" },
        ],
      },
      {
        type: "pick-many",
        key: "current_interests",
        other: true,
        title: "Are you still interested in the same things nowadays?",
        values: [
          {key: "friends", title: "Companionship (friends): wanted to create one or more tulpas to establish a friendship bond" },
          {key: "family", title: "Companionship (family): wanted to create one or more tulpas to establish a family bond (siblings, parents, etc)" },
          {key: "lovers", title: "Companionship (lovers): wanted to create one or more tulpas to engage in romance" },
          {key: "curiosity", title: "Curiosity: wanted to see if you could do it" },
          {key: "skepticism", title: "Skepticism: strongly doubted tulpas were a possibility and decided to try for yourself" },
          {key: "self_improvement", title: "Self-improvement: interest in possible benefits (enhanced memory recall, cooperation, second opinion, etc.)" },
          {key: "science", title: "Science: wanted to try and study the phenomenon" },
          {key: "fascination", title: "Fascination: tulpas sounded very interesting to the point of fascination" },
          {key: "selfhelp", title: "Self-help: needed help in a dire situation like suicide, or to deal with depression" },
          {key: "community", title: "Community appeal: the community seemed interesting and/or friendly" },
          {key: "friend", title: "Friendship: you have friends in the community which are the reason you stay around" },
          {key: "metaphysics", title: "Metaphysics: you were a practitioner or believer of metaphysics that are related, loosely or not, with tulpas" },
          {key: "nothing", title: "Not interested in tulpamancy anymore" },
        ],
      },
      {
        type: "pick-one",
        key: "discovered_tulpas",
        other: true,
        title: "How did you find out about tulpas?",
        values: [
          {key: "youtube", title: "Youtube"},
          {key: "book", title: "Book or story"},
          {key: "movie", title: "Movie"},
          {key: "music", title: "Music"},
          {key: "irc", title: "IRC or another IM"},
          {key: "fourchan", title: "4chan"},
          {key: "tumblr", title: "Tumblr"},
          {key: "reddit_tulpas", title: "Reddit, /r/tulpas"},
          {key: "reddit_other", title: "Reddit, another sub"},
          {key: "tulpa_info", title: "Tulpa.info"},
          {key: "tulpa_io", title: "Tulpa.io"},
          {key: "tulpa_im", title: "Tulpa.im"},
          {key: "tulpa_wiki", title: "Tulpa Wiki"},
          {key: "mlp", title: "My Little Pony community"},
          {key: "lesswrong", title: "Lesswrong"},
          {key: "creepypasta", title: "Creepypasta"},
          {key: "friends", title: "Friends"},
        ],
      },
      {
        type: "number",
        key: "discovered_tulpas_years",
        title: "How long have you known about tulpas?",
        help: "Specify full years since you are aware of tulpas (i.e. if you know about tulpas for less than a year, enter 0).",
      },
      {
        type: "pick-many",
        key: "tulpa_communities_active",
        other: true,
        title: "Which tulpa communities do you actively participate in?",
        help: "Only mark the communities in which you contribute and engage with users.",
        values: [
          {key: "tulpa_info", title: "Tulpa.info forums"},
          {key: "tulpa_io", title: "Tulpa.io"},
          {key: "tulpa_im", title: "Tulpa.im"},
          {key: "reddit_tulpas", title: "Reddit, /r/tulpas"},
          {key: "fourchan", title: "4chan"},
          {key: "tumblr", title: "Tumblr"},
          {key: "reddit_tulpas_irc", title: "#redditulpas irc"},
          {key: "tulpa_info_irc", title: "#tulpa.info / #tulpa.lounge irc"},
          {key: "reddit_tulpas_discord", title: "/r/tulpas discord server"},
        ],
      },
    {
        type: "pick-many",
        key: "tulpa_communities_passive",
        other: true,
        title: "Which tulpa communities do you track or follow?",
        help: "Only mark the communities in which you DO NOT contribute or engage with users, only watch.",
        values: [
          {key: "tulpa_info", title: "Tulpa.info forums"},
          {key: "tulpa_io", title: "Tulpa.io"},
          {key: "tulpa_im", title: "Tulpa.im"},
          {key: "reddit_tulpas", title: "Reddit, /r/tulpas"},
          {key: "fourchan", title: "4chan"},
          {key: "tumblr", title: "Tumblr"},
          {key: "reddit_tulpas_irc", title: "#redditulpas irc"},
          {key: "tulpa_info_irc", title: "#tulpa.info / #tulpa.lounge irc"},
          {key: "reddit_tulpas_discord", title: "/r/tulpas discord server"},
        ],
      },
      {
        type: "pick-one",
        key: "help_newbies",
        title: "Do you take interest in helping newbies in the communities you participate in?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "psych_or_meta",
        title: "Do you believe that tulpas are a psychological or metaphysical phenomenon?",
        values: [
          {key: "psychological", title: "Psychological"},
          {key: "metaphysical",  title: "Metaphysical"},
          {key: "both",          title: "Both"},
        ],
      },
    ],
  },
  tulpamancer: {
    title: "Tulpamancer",
    key: "tulpamancer",
    help: "These questions assess the physical body and the host. They are very important to " +
          "allow us to track the differences between hosts. If it so happens that you are the " +
          "tulpa, answering your questionnaire and the host is absolutely unavailable, please, " +
          "at least provide the answers for the physical body parameters.",
    questions: [
      {
        type: "number",
        key: "tulpamancer_age",
        title: "What is your age?",
      },
      {
        type: "pick-one",
        key: "tulpamancer_gender",
        other: true,
        title: "What is your gender?",
        values: [
          {key: "male", title: "Male"},
          {key: "female", title: "Female"},
          {key: "agender", title: "Agender"},
          {key: "transman", title: "Transman"},
          {key: "transwoman", title: "Transwoman"},
          {key: "genderqueer", title: "Genderqueer"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpamancer_sexuality",
        other: true,
        title: "What is your sexuality?",
        values: [
          {key: "heterosexual", title: "Heterosexual"},
          {key: "homosexual", title: "Homosexual"},
          {key: "bisexual", title: "Bisexual"},
          {key: "asexual", title: "Asexual"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpamancer_pre_sexuality",
        other: true,
        title: "What was your sexuality before you started with tulpamancy?",
        values: [
          {key: "heterosexual", title: "Heterosexual"},
          {key: "homosexual", title: "Homosexual"},
          {key: "bisexual", title: "Bisexual"},
          {key: "asexual", title: "Asexual"},
        ],
      },
      {
        type: "country",
        key: "tulpamancer_country",
        title: "What country are you from?",
      },
      {
        type: "pick-one",
        key: "tulpamancer_illnesses",
        title: "Do you have any known mental illnesses?",
        help: "Only for officially diagnosed illnesses.",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "pick-many",
        key: "tulpamancer_illnesses_explained",
        other: true,
        title: "Which mental illnesses are you diagnosed with?",
        help: "Please mark only officially diagnosed illnesses. Avoid marking self-diagnosed illnesses.",
        showif: "tulpamancer_illnesses:yes",
        values: [
          {key: "adhd", title: "ADHD"},
          {key: "anxiety", title: "Anxiety"},
          {key: "autism", title: "Autism"},
          {key: "bipolar", title: "Bipolar Disorder"},
          {key: "depression", title: "Depression"},
          {key: "personality_disorder", title: "Personality Disorder"},
          {key: "ptsd", title: "PTSD"},
          {key: "schizophrenia", title: "Schizophrenia"},
          {key: "did", title: "Dissociative Identity Disorder (DID)"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpamancer_religion",
        other: true,
        title: "What is your religion or belief system?",
        values: [
          {key: "agnostic", title: "Agnostic"},
          {key: "atheist", title: "Atheist"},
          {key: "buddhist", title: "Buddhist"},
          {key: "christian", title: "Christian"},
          {key: "daoist", title: "Daoist"},
          {key: "hindu", title: "Hindu"},
          {key: "jewish", title: "Jewish"},
          {key: "muslim", title: "Muslim"},
          {key: "sikh", title: "Sikh"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpamancer_doubt",
        title: "How severe is tulpa doubt for you?",
        values: [
          {key: "1", title: "No doubt at all"},
          {key: "2", title: "Negligible doubt"},
          {key: "3", title: "Medium doubt"},
          {key: "4", title: "Strong doubt"},
          {key: "5", title: "Very severe, progression stopper"},
        ],
      },
      {
        type: "pick-one",
        key: "distinctness",
        title: "Do you experience your tulpas as being distinct from yourself?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "sentience",
        title: "Do you believe your tulpas are sentient beings?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "lucid_dream",
        title: "Do you practice lucid dreaming?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "mind_form",
        title: "If you have a Wonderland, do you have a mind form?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "pick-many",
        key: "sex_experience",
        title: "What are your experiences with sex?",
        values: [
          {key: "no", title: "No experience, never had sex"},
          {key: "physical_other", title: "Physical, with other person"},
          {key: "physical_self", title: "Physical, masturbation or other self-pleasuring activity"},
          {key: "mental_tulpa", title: "In-system, with tulpa(s)"},
          {key: "mental_self", title: "Masturbation or other self-pleasuring activity in wonderland"},
          {key: "online", title: "Online, via roleplay activities"},
        ],
      },
      {
        type: "pick-one",
        key: "sex_libido",
        other: false,
        title: "In general, how is your libido?",
        values: [
          {key: "zero", title: "No desire for sex at all"},
          {key: "low", title: "Low desire for sex (something like once every few months)"},
          {key: "medium", title: "Some desire for sex (once per month)"},
          {key: "high", title: "High desire for sex (once per week)"},
          {key: "very_high", title: "Very high desire for sex (every day or more)"},
        ],
      },
      {
        type: "pick-one",
        key: "sex_enjoyment",
        other: false,
        title: "How enjoyable is tulpa sex for you? (regarding only you and your own tulpas)",
        values: [
          {key: "no_sex", title: "We never had sex"},
          {key: "very_bad", title: "Very unpleasant or not enjoyable at all"},
          {key: "bad", title: "Not very enjoyable or nothing special about it"},
          {key: "ok", title: "Enjoyable, but not outstanding"},
          {key: "good", title: "Very enjoyable and pleasant"},
          {key: "very_good", title: "Extremely enjoyable and pleasant"},
        ],
      },
    ],
  },
  tulpa_questions: {
    title: "Tulpa",
    key: "tulpa_questions",
    help: "These questions should be answered by each tulpa individually, if they are capable of " +
          "doing so.",
    questions: [
      {
        type: "pick-one",
        key: "tulpa_sentient",
        title: "Are you sentiently answering these questions?",
        help: "Pick \"yes\" if you are the tulpa in question that is now filling in this page by " +
              "the means of switching, possession, dictation to your host or any other means " +
              "that allow you to consciously answer to the best of your knowledge. " +
              "If the tulpa is too young to answer and the host is doing the questionnaire, " +
              "select \"no\" and continue further. This question is here only to figure if the " +
              "tulpa is fully developed or still growing.",
        values: [
          {key: "true", title: "Yes"},
          {key: "false", title: "No"},
        ],
      },
    {
        type: "pick-one",
        key: "tulpa_main",
        title: "Are you the main body's user?",
        help: "Pick \"yes\" if you are a tulpa and you spend more time in " +
              "control of the body than the original host.",
        values: [
          {key: "true", title: "Yes"},
          {key: "false", title: "No"},
        ],
      },
      {
        type: "number",
        key: "tulpa_age",
        title: "What is your age?",
        help: "Specify full years only; e.g. if you are younger than a year, then enter 0",
      },
      {
        type: "pick-one",
        key: "tulpa_gender",
        other: true,
        title: "What is your gender?",
        values: [
          {key: "male", title: "Male"},
          {key: "female", title: "Female"},
          {key: "agender", title: "Agender"},
          {key: "transman", title: "Transman"},
          {key: "transwoman", title: "Transwoman"},
          {key: "genderqueer", title: "Genderqueer"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_sexuality",
        other: true,
        title: "What is your sexuality?",
        values: [
          {key: "heterosexual", title: "Heterosexual"},
          {key: "homosexual", title: "Homosexual"},
          {key: "bisexual", title: "Bisexual"},
          {key: "asexual", title: "Asexual"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_natural_accidental",
        title: "Were you created intentionally or appeared by chance?",
        help: "By intentionally we assume that your host read guides and put conscious and " +
              "directed effort in your creation. By chance, your presence showed up and stayed by " +
              "any means (acknowledged, just stuck around, etc.)",
        values: [
          {key: "intentional", title: "Intentional"},
          {key: "accidental", title: "Accidental"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_has_form",
        title: "Do you have a form?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_shapeshifter",
        title: "Are you a shapeshifter?",
        values: [
          {key: "yes", title: "Yes, several forms"},
          {key: "no",  title: "No, single form"},
        ],
        showif: "tulpa_has_form:yes",
      },
      {
        type: "pick-one",
        key: "tulpa_form",
        other: true,
        title: "What is the overall shape of your form?",
        help: "If you are a shapeshifter, please select the option that best describes your main form." +
          "If you have more than one main form, just pick one for this census.",
        values: [
          {key: "humanoid", title: "Humanoid"},
          {key: "anthropomorphic", title: "Anthropomorphic"},
          {key: "quadruped", title: "Animal (quadruped)"},
          {key: "bird", title: "Animal (bird)"},
          {key: "aquatic", title: "Animal (aquatic)"},
          {key: "insect", title: "Animal (insect)"},
          {key: "inanimate", title: "Inanimate object"},
          {key: "abstract", title: "Ball of Light or another abstraction"},
        ],
        showif: "tulpa_has_form:yes",
      },
      {
        type: "pick-many",
        key: "tulpa_features",
        other: true,
        title: "Do you have any “extra defining features”? Mark all that apply to you",
        values: [
          {key: "feat_wings", title: "Wings"},
          {key: "feat_horns", title: "Horns"},
          {key: "feat_hooves", title: "Hooves"},
          {key: "feat_paws", title: "Paws"},
          {key: "feat_tail", title: "Tail"},
          {key: "feat_halo", title: "Halo"},
          {key: "feat_animal_ears", title: "Animal ears"},
          {key: "feat_long_ears", title: "Long ears"},
          {key: "feat_tattoo", title: "Tattoo"},
          {key: "feat_piercing", title: "Piercing"},
          {key: "feat_extra_limbs", title: "Extra arms or legs"},
          {key: "feat_extra_eyes", title: "Extra eyes"},
          {key: "feat_mood_display", title: "“Mood display” (e.g. hair or eyes that change color based on your mood)"},
          {key: "feat_ethereal_hair", title: "Ethereal hair"},
          {key: "feat_cutie_mark", title: "“Cutie mark”"},
          {key: "feat_heterochromia", title: "Heterochromia (different colored eyes)"},
          {key: "feat_assymetrical", title: "Form asymmetry (more or different limbs on either side, or colors)"},
          {key: "feat_exotic_material", title: "Exotic form material (elemental, edible, energy, etc.)"},
        ],
        showif: "tulpa_has_form:yes",
      },
      {
        type: "pick-many",
        key: "tulpa_size",
        other: false,
        title: "What is the size of your form?",
        values: [
          {key: "size_tiny", title: "Tiny (less than a foot tall)"},
          {key: "size_small", title: "Small (between a foot and human-sized)"},
          {key: "size_medium", title: "Medium (human-sized)"},
          {key: "size_large", title: "Large (up to twice the size of a human)"},
          {key: "size_very_large", title: "Very large (above twice the size of a human)"},
        ],
        showif: "tulpa_has_form:yes",
      },
      {
        type: "pick-many",
        key: "tulpa_species",
        other: true,
        title: "Does your form fit into one or more species' name?",
        values: [
          {key: "spec_angel", title: "Angel"},
          {key: "spec_canine", title: "Canine"},
          {key: "spec_demon", title: "Demon"},
          {key: "spec_elf", title: "Elf"},
          {key: "spec_fairy", title: "Fairy"},
          {key: "spec_feline", title: "Feline"},
          {key: "spec_human", title: "Human"},
          {key: "spec_pokemon", title: "Pokémon"},
          {key: "spec_pony", title: "Pony"},
          {key: "spec_reptile", title: "Reptile"},
          {key: "spec_shark", title: "Shark"},
          {key: "spec_vampire", title: "Vampire"},
        ],
        showif: "tulpa_has_form:yes",
      },
      {
        type: "pick-many",
        key: "tulpa_habits",
        other: true,
        title: "Do you adopt one or more specific habits in regards to your form?",
        values: [
          {key: "habi_nudist", title: "No clothes"},
          {key: "habi_floaty", title: "Always floating above the ground"},
          {key: "habi_size_changer", title: "Changes own size freely"},
          {key: "habi_rl_counterpart", title: "Real life counterpart (e.g. plush toy)"},
        ],
        showif: "tulpa_has_form:yes",
      },
      {
        type: "pick-one",
        key: "tulpa_form_personality",
        title: "What is the influence of your form on your personality?",
        help: "For example, if your form is a dog, do you also adopt dog mannerisms and habits in your daily life?",
        values: [
          {key: "1", title: "No influence at all"},
          {key: "2", title: "Little influence"},
          {key: "3", title: "Medium influence"},
          {key: "4", title: "Severe influence"},
          {key: "5", title: "Completely influenced"},
        ],
        showif: "tulpa_has_form:yes",
      },
      {
        type: "pick-one",
        key: "tulpa_media_based",
        title: "Are you based on any character from media or something?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "string",
        key: "tulpa_media_based_name",
        title: "What is that character’s name?",
        showif: "tulpa_media_based:yes",
      },
      {
        type: "string",
        key: "tulpa_media_based_universe",
        title: "What is that character’s universe?",
        help: "Examples: Pokémon, Lord of the Rings, My Little Pony, Undertale, etc.",
        showif: "tulpa_media_based:yes",
      },
      {
        type: "pick-one",
        key: "tulpa_reference_personality",
        title: "What is the influence of your reference character on your personality?",
        values: [
          {key: "1", title: "No influence at all"},
          {key: "2", title: "Little influence"},
          {key: "3", title: "Medium influence"},
          {key: "4", title: "Severe influence"},
          {key: "5", title: "Completely influenced"},
        ],
        showif: "tulpa_media_based:yes",
      },
      {
        type: "pick-one",
        key: "tulpa_religion",
        other: true,
        title: "What is your religion or belief system?",
        values: [
          {key: "agnostic", title: "Agnostic"},
          {key: "atheist", title: "Atheist"},
          {key: "buddhist", title: "Buddhist"},
          {key: "christian", title: "Christian"},
          {key: "daoist", title: "Daoist"},
          {key: "hindu", title: "Hindu"},
          {key: "jewish", title: "Jewish"},
          {key: "muslim", title: "Muslim"},
          {key: "sikh", title: "Sikh"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_host_relationship",
        other: true,
        title: "What would best describe the relationship between you and your host?",
        values: [
          {key: "friend_companion", title: "Friend or companion"},
          {key: "sibling", title: "Brother or sister"},
          {key: "parent_child", title: "Parent or child"},
          {key: "guardian", title: "Guardian"},
          {key: "lover", title: "Lover or romantic"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_wonderland_activity",
        title: "If you have a Wonderland, are you usually active in there at all times, " +
               "including when host doesn’t pay any attention to you?",
        values: [
          {key: "1", title: "Never active"},
          {key: "2", title: "Rarely active"},
          {key: "3", title: "Sometimes active"},
          {key: "4", title: "Frequently active"},
          {key: "5", title: "Always active"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_calling",
        title: "How often do you address your host or main body user while they are focused on a different task?",
        values: [
          {key: "1", title: "Never"},
          {key: "2", title: "Rarely, only when they’re doing something that allows them to daydream"},
          {key: "3", title: "Sometimes, independent of the task"},
          {key: "4", title: "Frequently"},
          {key: "5", title: "All the time"},
          {key: "6", title: "I'm the main body user"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_dream",
        title: "Do you dream?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_lucid_dream",
        title: "Do you lucid dream?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
        showif: "tulpa_dream:yes",
      },
      {
        type: "pick-many",
        key: "tulpa_sex_experience",
        title: "What are your experiences with sex?",
        values: [
          {key: "no", title: "No experience, never had sex"},
          {key: "insystem_host", title: "In-system, with host"},
          {key: "insystem_tulpa", title: "In-system, with other tulpa"},
          {key: "insystem_self", title: "In-system, masturbation or other self-pleasuring activity"},
          {key: "physical_other", title: "Physical, with other person (by switching or full body possession)"},
          {key: "physical_self", title: "Physical, masturbation or other self-pleasuring activity (by switching or full body possession)"},
          {key: "online", title: "Online, via roleplay activities"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_sex_libido",
        other: false,
        title: "In general, how is your libido?",
        values: [
          {key: "zero", title: "No desire for sex at all"},
          {key: "low", title: "Low desire for sex (something like once every few months)"},
          {key: "medium", title: "Some desire for sex (once per month)"},
          {key: "high", title: "High desire for sex (once per week)"},
          {key: "very_high", title: "Very high desire for sex (every day or more)"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_sex_enjoyment",
        other: false,
        title: "How enjoyable is in-system sex for you?",
        help: "In-system, as in, sex with your host or other tulpas in same mind.",
        values: [
          {key: "no_sex", title: "We never had sex"},
          {key: "very_bad", title: "Very unpleasant or not enjoyable at all"},
          {key: "bad", title: "Not very enjoyable or nothing special about it"},
          {key: "ok", title: "Enjoyable, but not outstanding"},
          {key: "good", title: "Very enjoyable and pleasant"},
          {key: "very_good", title: "Extremely enjoyable and pleasant"},
        ],
      },
      {
        type: "pick-one",
        key: "tulpa_sex_online_enjoyment",
        other: false,
        title: "How enjoyable is online roleplay sex for you?",
        values: [
          {key: "no_sex", title: "I don't do it."},
          {key: "very_bad", title: "Very unpleasant or not enjoyable at all"},
          {key: "bad", title: "Not very enjoyable or nothing special about it"},
          {key: "ok", title: "Enjoyable, but not outstanding"},
          {key: "good", title: "Very enjoyable and pleasant"},
          {key: "very_good", title: "Extremely enjoyable and pleasant"},
        ],
      },
    ],
  },
  wonderland: {
    title: "Wonderland",
    key: "wonderland",
    questions: [
      {
        type: "pick-one",
        key: "wonderland_exist",
        title: "Do you have a wonderland?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "no",  title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "wonderland_stability",
        title: "How stable is your wonderland?",
        values: [
          {key: "1", title: "Very unstable, changes all the time"},
          {key: "2", title: "Mostly unstable, only a small place we focus the most on remains static"},
          {key: "3", title: "Approximately similar amounts of stability and instability"},
          {key: "4", title: "Mostly stable, few things changes without our consent"},
          {key: "5", title: "Very stable, only intended changes occur"},
        ],
        showif: "wonderland_exist:yes",
      },
      {
        type: "pick-one",
        key: "wonderland_contribution",
        title: "Who contributes the most to your wonderland?",
        values: [
          {key: "1", title: "Tulpas"},
          {key: "2", title: "Mostly the tulpas, host doesn’t contribute much"},
          {key: "3", title: "Everybody contributes in a similar amount"},
          {key: "4", title: "Mostly the host, tulpas don’t contribute much"},
          {key: "5", title: "Host"},
        ],
        showif: "wonderland_exist:yes",
      },
      {
        type: "pick-many",
        key: "wonderland_references",
        other: true,
        title: "What did you use as wonderland references?",
        values: [
          {key: "rl_pictures", title: "Real life pictures or videos"},
          {key: "rl_memories", title: "Real life memories"},
          {key: "fic_pictures", title: "Fictional pictures, videos or games"},
          {key: "fic_texts", title: "Fictional texts or stories"},
          {key: "nothing", title: "Nothing"},
        ],
        showif: "wonderland_exist:yes",
      },
    ],
  },
  skills: {
    title: "Skills",
    key: "skills",
    questions: [
      {
        type: "pick-one",
        key: "skill_attempt_visualization",
        other: false,
        title: "Have you attempted to train visualization?",
        help: "Visualization means visualizing your tulpa’s form in your mind or wonderland",
        values: [
          {key: "yes", title: "Yes"},
          {key: "interested", title: "No, but interested"},
          {key: "no", title: "No"},
          {key: "not_interested", title: "Tried it, not interested to pursue further."},
        ],
      },
      {
        type: "number",
        key: "skill_time_develop_visualization",
        title: "How many months did it take for you to develop visualization until it could be performed reliably?",
        help: "Leave at 0 if you have not trained it yet, 1 if one month or less, and so on.",
      },
      {
        type: "pick-one",
        key: "skill_rate_visualization",
        title: "How do you rate your visualization skill?",
        values: [
          {key: "0", title: "Can’t or have not attempted"},
          {key: "1", title: "Can visualize simple unconnected shapes"},
          {key: "2", title: "Can visualize small shapes"},
          {key: "3", title: "Can visualize medium-sized or complex shapes"},
          {key: "4", title: "Can visualize any shapes from any point of view"},
          {key: "5", title: "Can visualize anything perfectly"},
        ],
      },
      {
        type: "pick-one",
        key: "skill_attempt_vocality",
        other: false,
        title: "Have you attempted to train Vocality or Mindvoice?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "interested", title: "No, but interested"},
          {key: "no", title: "No"},
          {key: "not_interested", title: "Tried it, not interested to pursue further."},
        ],
      },
      {
        type: "number",
        key: "skill_time_develop_vocality",
        title: "How many months did it take for you to develop vocality or mindvoice until it could be performed reliably?",
        help: "Leave at 0 if you have not trained it yet, 1 if one month or less, and so on.",
      },
      {
        type: "pick-one",
        key: "skill_rate_vocality",
        title: "How do you rate your vocality or mindvoice skill?",
        values: [
          {key: "0", title: "Can’t or have not attempted"},
          {key: "1", title: "Can get faint yes or no impressions when addressing your tulpa"},
          {key: "2", title: "Can get more complex impressions from your tulpa (names, feelings)"},
          {key: "3", title: "Can get small and not extremely clear speech from your tulpa"},
          {key: "4", title: "Can hold small conversations with a more acceptable amount of clarity"},
          {key: "5", title: "Can hold conversations all day perfectly"},
        ],
      },
      {
        type: "pick-one",
        key: "skill_attempt_parallel",
        other: false,
        title: "Have you attempted to train Parallel Processing?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "interested", title: "No, but interested"},
          {key: "no", title: "No"},
          {key: "not_interested", title: "Tried it, not interested to pursue further."},
        ],
      },
      {
        type: "number",
        key: "skill_time_develop_parallel",
        title: "How many months did it take for you to develop parallel processing until it could be performed reliably?",
        help: "Leave at 0 if you have not trained it yet, 1 if one month or less, and so on.",
      },
      {
        type: "pick-one",
        key: "skill_rate_parallel",
        title: "How do you rate your Parallel Processing skill?",
        values: [
          {key: "0", title: "Can’t or have not attempted"},
          {key: "1", title: "Can hold small conversations between yourselves"},
          {key: "2", title: "Can multitask simple tasks with lots of effort: host is doing something not too complex and still proxy their tulpa talking to someone else"},
          {key: "3", title: "Can multitask simple tasks with more ease"},
          {key: "4", title: "Can multitask more complex tasks with relative ease"},
          {key: "5", title: "Can perfectly hold distinct trains of thought about different subjects"},
        ],
      },
      {
        type: "pick-one",
        key: "skill_attempt_possession",
        other: false,
        title: "Have you attempted to train Possession?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "interested", title: "No, but interested"},
          {key: "no", title: "No"},
          {key: "not_interested", title: "Tried it, not interested to pursue further."},
        ],
      },
      {
        type: "number",
        key: "skill_time_develop_possession",
        title: "How many months did it take for you to develop possession until it could be performed reliably?",
        help: "Leave at 0 if you have not trained it yet, 1 if one month or less, and so on.",
      },
      {
        type: "pick-one",
        key: "skill_rate_possession",
        title: "How do you rate your Possession skill?",
        values: [
          {key: "0", title: "Can’t or have not attempted"},
          {key: "1", title: "Can feel or twitch a limb for short time"},
          {key: "2", title: "Can move and control a limb with some precision for a short time"},
          {key: "3", title: "Can more precisely move and control one or two limbs for some time"},
          {key: "4", title: "Can possess most or all of the body for some time"},
          {key: "5", title: "Can perfectly possess the whole body for a long time"},
        ],
      },
      {
        type: "pick-one",
        key: "skill_attempt_imposition",
        other: false,
        title: "Have you attempted to train Imposition?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "interested", title: "No, but interested"},
          {key: "no", title: "No"},
          {key: "not_interested", title: "Tried it, not interested to pursue further."},
        ],
      },
      {
        type: "number",
        key: "skill_time_develop_imposition",
        title: "How many months did it take for you to develop imposition until it could be performed reliably?",
        help: "Leave at 0 if you have not trained it yet, 1 if one month or less, and so on.",
      },
      {
        type: "pick-one",
        key: "skill_rate_imposition",
        title: "How do you rate your Imposition skill?",
        values: [
          {key: "0", title: "Can’t or have not attempted"},
          {key: "1", title: "Can faintly and briefly see shapes at the edge of your sight"},
          {key: "2", title: "Can faintly see or feel your tulpa, very weak impressions"},
          {key: "3", title: "Can see or feel your tulpa better, clearer image and sensation"},
          {key: "4", title: "Can see and feel your tulpa reliably and more detailed"},
          {key: "5", title: "Can perfectly see and feel your tulpa anywhere in your daily life"},
        ],
      },
      {
        type: "pick-one",
        key: "skill_attempt_switching",
        other: false,
        title: "Have you attempted to train Switching?",
        values: [
          {key: "yes", title: "Yes"},
          {key: "interested", title: "No, but interested"},
          {key: "no", title: "No"},
          {key: "not_interested", title: "Tried it, not interested to pursue further."},
        ],
      },
      {
        type: "number",
        key: "skill_time_develop_switching",
        title: "How many months did it take for you to develop switching until it could be performed reliably?",
        help: "Leave at 0 if you have not trained it yet, 1 if one month or less, and so on.",
      },
      {
        type: "pick-one",
        key: "skill_rate_switching",
        title: "How do you rate your Switching skill?",
        values: [
          {key: "0", title: "Can’t or have not attempted"},
          {key: "1", title: "Can rarely switch by accident, not reliably"},
          {key: "2", title: "Can sometimes switch on demand for brief intervals"},
          {key: "3", title: "Can switch on demand for small amounts of time"},
          {key: "4", title: "Can switch for hours"},
          {key: "5", title: "Can perfectly switch for long periods of time"},
        ],
      },
      {
        type: "pick-one",
        key: "blending",
        title: "How often do you mistake your own, and your tulpa's thoughts (also known as blending)?",
        values: [
          {key: "1", title: "Never"},
          {key: "2", title: "Rarely, very dependent on what we’re thinking (similar interests for example)"},
          {key: "3", title: "Sometimes"},
          {key: "4", title: "Frequently, our thoughts blend often when we’re doing something together"},
          {key: "5", title: "Almost always"},
        ],
      },
      {
        type: "pick-one",
        key: "emotion_blending_general",
        title: "To what extent do your emotions correlate with those of your tulpa?",
        values: [
          {key: "1", title: "Never"},
          {key: "2", title: "We rarely feel the same about most things"},
          {key: "3", title: "Sometimes"},
          {key: "4", title: "Frequently as we share the same feelings about many things"},
          {key: "5", title: "Completely"},
        ],
      },
      {
        type: "pick-one",
        key: "emotion_blending_host_tulpa",
        title: "How often does your emotions affect your tulpas?",
        help: "When you feel especially happy or sad, for example, does that make them feel the same even though they are not the source of the emotions?",
        values: [
          {key: "1", title: "Never"},
          {key: "2", title: "Rarely, only strong emotions bleed over"},
          {key: "3", title: "Sometimes"},
          {key: "4", title: "Frequently, even weaker emotions bleed over"},
          {key: "5", title: "Almost always"},
        ],
      },
      {
        type: "pick-one",
        key: "emotion_blending_tulpa_host",
        title: "Tulpas: How often does your emotions affect your host?",
        help: "When you feel especially happy or sad, for example, does that make them feel the same even though they are not the source of the emotions?",
        values: [
          {key: "1", title: "Never"},
          {key: "2", title: "Rarely, only strong emotions bleed over"},
          {key: "3", title: "Sometimes"},
          {key: "4", title: "Frequently, even weaker emotions bleed over"},
          {key: "5", title: "Almost always"},
        ],
      },
    ],
  },
  social: {
    title: "Family, friends, psychologists and tulpas",
    key: "social",
    questions: [
      {
        type: "pick-one",
        key: "social_family",
        other: false,
        title: "Have you told anyone in your family about your tulpas?",
        values: [
          {key: "yes_positive", title: "Yes and they had a positive reaction"},
          {key: "yes_neutral", title: "Yes and they had a neutral reaction"},
          {key: "yes_negative", title: "Yes and they had a negative reaction"},
          {key: "no", title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "social_rl_friends",
        other: false,
        title: "Have you told any local friends about your tulpas?",
        values: [
          {key: "yes_positive", title: "Yes and they had a positive reaction"},
          {key: "yes_neutral", title: "Yes and they had a neutral reaction"},
          {key: "yes_negative", title: "Yes and they had a negative reaction"},
          {key: "no", title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "social_web_friends",
        other: false,
        title: "Have you told any internet friends (outside of the tulpamancy communities) about your tulpas?",
        values: [
          {key: "yes_positive", title: "Yes and they had a positive reaction"},
          {key: "yes_neutral", title: "Yes and they had a neutral reaction"},
          {key: "yes_negative", title: "Yes and they had a negative reaction"},
          {key: "no", title: "No"},
        ],
      },
      {
        type: "pick-one",
        key: "social_so",
        other: false,
        title: "Have you told your SO (Significant Other) about your tulpas?",
        values: [
          {key: "yes_positive", title: "Yes and they had a positive reaction"},
          {key: "yes_neutral", title: "Yes and they had a neutral reaction"},
          {key: "yes_negative", title: "Yes and they had a negative reaction"},
          {key: "no", title: "No"},
          {key: "no_so", title: "I don't have a SO"},
          {key: "host_so", title: "My SO knew of tulpas beforehand"},
          {key: "tulpa_so", title: "My tulpa is my SO"},
        ],
      },
      {
        type: "pick-one",
        key: "social_psych",
        other: false,
        title: "If you regularly visit a psychologist, have you told them about your tulpas?",
        values: [
          {key: "yes_positive", title: "Yes and they had a positive reaction"},
          {key: "yes_neutral", title: "Yes and they had a neutral reaction"},
          {key: "yes_negative", title: "Yes and they had a negative reaction"},
          {key: "no", title: "No"},
          {key: "no_psych", title: "I don't visit a psychologist or equivalent"},
        ],
      },
    ],
  },
};
