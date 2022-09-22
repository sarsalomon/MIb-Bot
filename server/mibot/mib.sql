--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Appel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Appel" (
    id bigint NOT NULL,
    "chatId" bigint,
    passport text,
    phone text,
    description text,
    "districtId" bigint,
    status bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Appel" OWNER TO postgres;

--
-- Name: Appel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Appel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Appel_id_seq" OWNER TO postgres;

--
-- Name: Appel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Appel_id_seq" OWNED BY public."Appel".id;


--
-- Name: District; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."District" (
    id bigint NOT NULL,
    "nameUz" text,
    "nameRu" text,
    "nameOz" text,
    "nameEn" text,
    "descriptionUz" text,
    "descriptionRu" text,
    "descriptionOz" text,
    "descriptionEn" text,
    phone text,
    location text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    command text
);


ALTER TABLE public."District" OWNER TO postgres;

--
-- Name: District_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."District_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."District_id_seq" OWNER TO postgres;

--
-- Name: District_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."District_id_seq" OWNED BY public."District".id;


--
-- Name: Reception; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reception" (
    id bigint NOT NULL,
    "chatId" bigint,
    passport text,
    phone text,
    description text,
    "districtId" bigint,
    status bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Reception" OWNER TO postgres;

--
-- Name: Reception_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reception_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Reception_id_seq" OWNER TO postgres;

--
-- Name: Reception_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reception_id_seq" OWNED BY public."Reception".id;


--
-- Name: TelegramMembers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TelegramMembers" (
    id integer NOT NULL,
    "chatId" bigint NOT NULL,
    name text,
    phone text,
    "districtId" integer NOT NULL,
    lang text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."TelegramMembers" OWNER TO postgres;

--
-- Name: TelegramMembers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TelegramMembers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TelegramMembers_id_seq" OWNER TO postgres;

--
-- Name: TelegramMembers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TelegramMembers_id_seq" OWNED BY public."TelegramMembers".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id bigint NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    "districtId" bigint NOT NULL,
    status bigint NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "chatId" bigint
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Appel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appel" ALTER COLUMN id SET DEFAULT nextval('public."Appel_id_seq"'::regclass);


--
-- Name: District id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District" ALTER COLUMN id SET DEFAULT nextval('public."District_id_seq"'::regclass);


--
-- Name: Reception id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reception" ALTER COLUMN id SET DEFAULT nextval('public."Reception_id_seq"'::regclass);


--
-- Name: TelegramMembers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TelegramMembers" ALTER COLUMN id SET DEFAULT nextval('public."TelegramMembers_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Appel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Appel" (id, "chatId", passport, phone, description, "districtId", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: District; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."District" (id, "nameUz", "nameRu", "nameOz", "nameEn", "descriptionUz", "descriptionRu", "descriptionOz", "descriptionEn", phone, location, "createdAt", "updatedAt", command) FROM stdin;
2	Bekobod shahri	город Бекобад 	Бекобод шаҳри	Bekobad city	Boʼlim aloqa raqami:(0370)214-09-66\n\nBoʼlim davlat ijrochilar raqami:\n+998937020017 E.X.Аshurov\n+998974280107 M.M.Madaliev\n+998996402361 А.А.Salimboev\n+998903275000 U.X.Kendjaev\n+998937021700 D.M.Rasulov\n+998332741728 D.U.Bayturaev\n+998330100648 X.M.Аzimova\n\n\nKantselyariya: +998901121498	Контактный телефон отдела: (0370)214-09-66\n\nИсполнительный номер департамента штата:\n+998937020017 Э. Х. Ашуров\n+998974280107 Мадалиев М.М.\n+998996402361 Салимбоев А.А.\n+998903275000 У.Хенджаев\n+998937021700 Расулов ​​Д.М.\n+998332741728 Д.У.Байтураев\n+998330100648 Азимова Х.М.\n\n\nОфис: +998901121498	Бўлим алоқа рақами:(0370)214-09-66\n\nБўлим давлат ижрочилар рақами:\n+998937020017   Э.Х.Ашуров\n+998974280107   М.М.Мадалиев\n+998996402361   А.А.Салимбоев\n+998903275000   У.Х.Кенджаев\n+998937021700   Д.М.Расулов\n+998332741728   Д.У.Байтураев\n+998330100648   Х.М.Азимова\n\n\nКанцелярия: +998901121498	Department contact phone: (0370)214-09-66\n\nState Department Executive Number:\n+998937020017 E. Kh. Ashurov\n+998974280107 Madaliev M.M.\n+998996402361 Salimboev A.A.\n+998903275000 U.Khendzhaev\n+998937021700 Rasulov D.M.\n+998332741728 D.U.Baituraev\n+998330100648 Azimova Kh.M.\n\n\nOffice: +998901121498	\N		2022-09-13 02:03:32.974+05	2022-09-13 02:03:32.974+05	BekobodSend
6	Zangiota tumani	Зангиатинский район	Зангиота тумани	Zangiota district	Boʼlim aloqa raqami: +9989983073717\n\nBoʼlim davlat ijrochilar raqami:\n+998935869449 B.N.Ismatillaev\n+998988084422 B.O.Xaitova\n+998972645777 M.M.Mirnamatov\n+998995752000 Sh.I.Kurbanov\n+998981270737 B.B.Shamsudinov\n+998935901234 А.А.Shermuxamedov\n+998935300117 B.S.Ochilov\n+998943662912 X.Z.Xasanov\n+998938252552 N.K.Erkinov\n+998904400070 X.S.Ganiev\n+998909852501 U.E.Sherov\n+998992811841 D.S.Oʼtkirov\n+998916997001 А.M.Otajonov\n+998949391539 U.J.Payziev\n+998983073717 А.А.Isabaev\n+998994829041 А.А.Ganiboev\n\n\nKantselyariya: +9989983073717	Контактный телефон отдела: +9989983073717\n\nИсполнительный номер департамента штата:\n+998935869449 Исматиллаев Б.Н.\n+998988084422 Хаитова Б.О.\n+998972645777 Мирнаматов М.М.\n+998995752000 Курбанов Ш.И.\n+998981270737 Шамсудинов Б.Б.\n+998935901234 Шермухамедов А.А.\n+998935300117 Очилов Б.С.\n+998943662912 Хасанов Х.З.\n+998938252552 Эркинов Н.К.\n+998904400070 Ганиев Г.С.\n+998909852501 Шеров У.Е.\n+998992811841 Откиров Д.С.\n+998916997001 Атайонов А.М.\n+998949391539 У.Ж.Пайзиев\n+998983073717 Исабаев А.А.\n+998994829041 Ганибоев А.А.\n\n\nОфис: +9989983073717	Бўлим алоқа рақами: +9989983073717\n\nБўлим давлат ижрочилар рақами:\n+998935869449        Б.Н.Исматиллаев\n+998988084422        Б.О.Хаитова\n+998972645777        М.М.Мирнаматов\n+998995752000        Ш.И.Курбанов\n+998981270737        Б.Б.Шамсудинов\n+998935901234        А.А.Шермухамедов\n+998935300117        Б.С.Очилов\n+998943662912        Х.З.Хасанов\n+998938252552        Н.К.Эркинов\n+998904400070        Х.С.Ганиев\n+998909852501        У.Э.Шеров\n+998992811841        Д.С.Ўткиров\n+998916997001        А.М.Отажонов\n+998949391539        У.Ж.Пайзиев\n+998983073717        А.А.Исабаев\n+998994829041        А.А.Ганибоев\n\n\nКанцелярия: +9989983073717	Department contact phone: +9989983073717\n\nState Department Executive Number:\n+998935869449 Ismatillaev B.N.\n+998988084422 Khaitova B.O.\n+998972645777 Mirnamatov M.M.\n+998995752000 Kurbanov Sh.I.\n+998981270737 Shamsudinov B.B.\n+998935901234 Shermukhamedov A.A.\n+998935300117 Ochilov B.S.\n+998943662912 Khasanov Kh.Z.\n+998938252552 Erkinov N.K.\n+998904400070 Ganiev G.S.\n+998909852501 Sherov U.E.\n+998992811841 Otkirov D.S.\n+998916997001 Atayonov A.M.\n+998949391539 U.Zh.Paiziev\n+998983073717 Isabaev A.A.\n+998994829041 Ganiboev A.A.\n\n\nOffice: +9989983073717	\N		2022-09-13 02:10:57.881+05	2022-09-13 02:10:57.881+05	ZangiotaSendT
8	Chirchiq shahri	город Чирчик	Чирчиқ шаҳри	Chirchik city	Boʼlim aloqa raqami: (0370)716-46-33\n\nBoʼlim davlat ijrochilar raqami:\n+998998542385 T.E.Bayjigitov\n+998998832309 B.B.Rejepov\n+998935818088 I.S.Аbduraimova\n+998981210411 E.O.Ergashev\n+998977060603 I.U.Mingbaev\n+998973470808 S.Y.Shoagzamov\n+998998930002 K.X.Tojiboev\n+998998207910 D.S.Matkabulov\n+998933033996 J.А.Zakirov\n\n\nKantselyariya:(0370)716-46-33	Контактный телефон отдела: (0370)716-46-33\n\nИсполнительный номер департамента штата:\n+998998542385 Байжигитов Т.Э.\n+998998832309 Реджепов Б.Б.\n+998935818088 Абдураимова И.С.\n+998981210411 Е.О.Эргашев\n+998977060603 Мингбаев И.У.\n+998973470808 Шоагзамов С.Ю.\n+998998930002 К. Х. Тожибоев\n+998998207910 Маткабулов Д.С.\n+998933033996 Закиров Ж.А.\n\n\nОфис: (0370)716-46-33	Бўлим алоқа рақами: (0370)716-46-33\n\nБўлим давлат ижрочилар рақами:\n+998998542385        Т.Е.Байжигитов\n+998998832309        Б.Б.Режепов\n+998935818088        И.С.Абдураимова\n+998981210411        Э.О.Эргашев\n+998977060603        И.У.Мингбаев\n+998973470808        С.Й.Шоагзамов\n+998998930002        К.Х.Тожибоев\n+998998207910        Д.С.Маткабулов\n+998933033996        Ж.А.Закиров\n\n\nКанцелярия: (0370)716-46-33	Contact phone of the department: (0370) 716-46-33\n\nState Department Executive Number:\n+998998542385 Baizhigitov T.E.\n+998998832309 Rejepov B.B.\n+998935818088 Abduraimova I.S.\n+998981210411 E.O. Ergashev\n+998977060603 Mingbaev I.U.\n+998973470808 Shoagzamov S.Yu.\n+998998930002 K. Kh. Tojiboev\n+998998207910 Matkabulov D.S.\n+998933033996 Zakirov Zh.A.\n\n\nOffice: (0370)716-46-33	\N		2022-09-13 02:15:07.28+05	2022-09-13 02:15:07.28+05	ChirchikSend
7	Qibray tumani	Кибрайский район	Қибрай тумани	Qibray district	Boʼlim aloqa raqami:(0370)956-27-20\n\nBoʼlim davlat ijrochilar raqami:\n+998946192989 Sh.Sh.Shomurodov\n+998977140029 M.M.Turadjonov\n+998981271090 J.S.Djagbarov\n+998977449902 O.U.Nurmetov\n+998983052939 А.M.Xudoyberganov\n+998970064551 X.O.Furqatov\n+998999030121 I.X.Аliakbarov\n+998935366695 D.X.Isroilov\n+998951001119 А.E.Naimov\n+998974547379 Z.T.Sherpulatova\n+998974547379 F.F.Jumanov\n+998950047370 M.M.Sizdikxodjaev\n+998974092882 N.D.Gafurova\n+998997960387 U.B.Аbdullaev\n\n\nKantselyariya: +998998134173	Контактный телефон отдела: (0370)956-27-20\n\nИсполнительный номер департамента штата:\n+998946192989 Шомуродов Ш.Ш.\n+998977140029 Тураджонов М.М.\n+998981271090 Джагбаров Ж.С.\n+998977449902 Нурметов О.У.\n+998983052939 Худойберганов А.М.\n+998970064551 Фуркатов К.О.\n+998999030121 Алякбаров И. Х.\n+998935366695 Исраэлов Д.Х.\n+998951001119 Наимов А.Э.\n+998974547379 Шерпулатова З.Т.\n+998974547379 Джуманов Ф.Ф.\n+998950047370 Сыздикходжаев М.М.\n+998974092882 Гафурова Н.Д.\n+998997960387 Абдуллаев У.Б.\n\n\nОфис: +998998134173	Бўлим алоқа рақами:(0370)956-27-20\n\nБўлим давлат ижрочилар рақами:\n+998946192989   Ш.Ш.Шомуродов\n+998977140029   М.М.Тураджонов\n+998981271090   Ж.С.Джагбаров\n+998977449902   О.У.Нурметов\n+998983052939   А.М.Худойберганов\n+998970064551   Х.О.Фурқатов\n+998999030121   И.Х.Алиакбаров\n+998935366695   Д.Х.Исроилов\n+998951001119   А.Э.Наимов\n+998974547379   З.Т.Шерпулатова\n+998974547379   Ф.Ф.Жуманов\n+998950047370   М.М.Сиздикходжаев\n+998974092882   Н.Д.Гафурова\n+998997960387   У.Б.Абдуллаев\n\n\nКанцелярия: +998998134173	Department contact phone: (0370)956-27-20\n\nState Department Executive Number:\n+998946192989 Shomurodov Sh.Sh.\n+998977140029 Turajonov M.M.\n+998981271090 Zh.S. Dzhagbarov\n+998977449902 Nurmetov O.U.\n+998983052939 Khudoyberganov A.M.\n+998970064551 Furkatov K.O.\n+998999030121 Alyakbarov I. Kh.\n+998935366695 Israelov D.Kh.\n+998951001119 Naimov A.E.\n+998974547379 Sherpulatova Z.T.\n+998974547379 Dzhumanov F.F.\n+998950047370 Syzdikhodzhaev M.M.\n+998974092882 Gafurova N.D.\n+998997960387 Abdullaev U.B.\n\n\nOffice: +998998134173	\N		2022-09-13 02:11:59.437+05	2022-09-13 02:11:59.437+05	QibraySendT
9	Quyichirchiq tumani	Куйчичикский район	Қуйичирчиқ тумани	Kuyichirchik district	Boʼlim aloqa raqami: +998974620103\n\nBoʼlim davlat ijrochilar raqami:\n+998901362922 А.M.Oʼrinov\n+998975390909 K.S.Gʼofurjonov\n+998978737700 J.N.Roʼzaliev\n+998976043009 Sh.S.Аtxamov\n+998977627711 А.А.Аlimjonov\n+998974284013 F.R.Bekmetova\n+998975999100 S.А.Vaxabov\n\n\nKantselyariya: +998974620103	Контактный телефон отдела: +998974620103\n\nИсполнительный номер департамента штата:\n+998901362922 Оринов А.М.\n+998975390909 Гофурджанов К.С.\n+998978737700 Розалиев Ж.Н.\n+998976043009 Атхамов Ш.С.\n+998977627711 Алимжанов А.А.\n+998974284013 Бекметова Ф.Р.\n+998975999100 Вагабов С.А.\n\n\nОфис: +998974620103	Бўлим алоқа рақами: +998974620103\n\nБўлим давлат ижрочилар рақами:\n+998901362922     А.М.Ўринов\n+998975390909     К.С.Ғофуржонов\n+998978737700     Ж.Н.Рўзалиев\n+998976043009     Ш.С.Атхамов\n+998977627711     А.А.Алимжонов\n+998974284013     Ф.Р.Бекметова\n+998975999100     С.А.Вахабов\n\n\nКанцелярия: +998974620103	Department contact phone: +998974620103\n\nState Department Executive Number:\n+998901362922 Orinov A.M.\n+998975390909 Gofurdzhanov K.S.\n+998978737700 Rozaliev Zh.N.\n+998976043009 Atkhamov Sh.S.\n+998977627711 Alimzhanov A.A.\n+998974284013 Bekmetova F.R.\n+998975999100 Vagabov S.A.\n\n\nOffice: +998974620103	\N		2022-09-13 02:17:48.354+05	2022-09-13 02:17:48.354+05	QuyichirchiqSendT
10	O'rtachirchiq tumani	Уртачирчикский район	Ўртачирчиқ тумани	Urtachirchik district	Boʼlim aloqa raqami: +998983611701\n\nBoʼlim davlat ijrochilar raqami:\n+998886336655 I.M.Yunusov\n+998977909646 F.Yu.Yakubov\n+998977769092 Sh.K.Mamaraimov\n+998942877070 D.S.Maxammadiev\n+998998451585 S.F.Xasanov\n+998994041615 D.M.Rasulov\n+998932340770 U.S.Muzrapov\n+998901304842 B.K.Mirzaev\n+998939297504 R.X.Xalilov\n+998983630088 I.I.Sotiboldiev\n+998950122701 X.Sh.Samigjonova\n\n\nKantselyariya: +998983611701	Контактный телефон отдела: +998983611701\n\nИсполнительный номер департамента штата:\n+998886336655 Юнусов И.М.\n+998977909646 Ф. Ю. Якубов\n+998977769092 Мамараимов Ш.К.\n+998942877070 Махаммадиев Д.С.\n+998998451585 Хасанов С.Ф.\n+998994041615 Расулов ​​Д.М.\n+998932340770 Музрапов У.С.\n+998901304842 Мирзаев Б.К.\n+998939297504 Халилов Р.К.\n+998983630088 Сотиболдиев И.И.\n+998950122701 Самигжонова Х.Ш.\n\n\nОфис: +998983611701	Бўлим алоқа рақами: +998983611701\n\nБўлим давлат ижрочилар рақами:\n+998886336655        И.М.Юнусов\n+998977909646        Ф.Ю.Якубов\n+998977769092        Ш.К.Мамараимов\n+998942877070        Д.С.Махаммадиев\n+998998451585        С.Ф.Хасанов\n+998994041615        Д.М.Расулов\n+998932340770        У.С.Музрапов\n+998901304842        Б.К.Мирзаев\n+998939297504        Р.Х.Халилов\n+998983630088        И.И.Сотиболдиев\n+998950122701        Х.Ш.Самигжонова\n\n\nКанцелярия: +998983611701	Department contact phone: +998983611701\n\nState Department Executive Number:\n+998886336655 Yunusov I.M.\n+998977909646 F. Yu. Yakubov\n+998977769092 Mamaraimov Sh.K.\n+998942877070 Mahammadiev D.S.\n+998998451585 Khasanov S.F.\n+998994041615 Rasulov D.M.\n+998932340770 Muzrapov U.S.\n+998901304842 Mirzaev B.K.\n+998939297504 Khalilov R.K.\n+998983630088 Sotiboldiev I.I.\n+998950122701 Samigzhonova H.Sh.\n\n\nOffice: +998983611701	\N		2022-09-13 02:19:38.91+05	2022-09-13 02:19:38.91+05	OrtachirchiqSendT
11	Yuqorichirchiq tumani	Юкоричирчикский район	Юқоричирчиқ тумани	Yukorichirchik district	Boʼlim aloqa raqami: (0370)983-16-88\n\nBoʼlim davlat ijrochilar raqami:\n+998981213001 Sh.O.Sultonov\n+998949398717 X.G.Mirsoatov\n+998909303074 D.Yu.Mirzaev\n+998973470847 Sh.Z.Nukirdinova\n+998983017118 Z.S.Ergashev\n+998982004045 N.N.Xoshimov\n+998998660242 А.B.Kalandarov\n\nKantselyariya: +998949451707	Контактный телефон отдела: (0370)983-16-88\n\nИсполнительный номер департамента штата:\n+998981213001 Султанов Ш.О.\n+998949398717 Мирсоатов Х.Г.\n+998909303074 Д. Ю. Мирзаев\n+998973470847 Нукирдинова Ш.З.\n+998983017118 Эргашев З.С.\n+998982004045 Хошимов Н.Н.\n+998998660242 Каландаров А.Б.\n\nОфис: +998949451707	Бўлим алоқа рақами: (0370)983-16-88\n\nБўлим давлат ижрочилар рақами:\n+998981213001        Ш.О.Султонов\n+998949398717        Х.Г.Мирсоатов\n+998909303074        Д.Ю.Мирзаев\n+998973470847        Ш.З.Нукирдинова\n+998983017118        З.С.Эргашев\n+998982004045        Н.Н.Хошимов\n+998998660242        А.Б.Каландаров\n\nКанцелярия: +998949451707	Department contact phone: (0370)983-16-88\n\nState Department Executive Number:\n+998981213001 Sultanov Sh.O.\n+998949398717 Mirsoatov Kh.G.\n+998909303074 D. Yu. Mirzaev\n+998973470847 Nukirdinova Sh.Z.\n+998983017118 Ergashev Z.S.\n+998982004045 Khoshimov N.N.\n+998998660242 Kalandarov A.B.\n\nOffice: +998949451707	\N		2022-09-13 02:22:28.3+05	2022-09-13 02:22:28.3+05	YuqorichirchiqSendT
13	Oqqo'rg'on tumani	Аккурганский район	Оққўрғон тумани	Akkurgan district	Boʼlim aloqa raqami: (0370)552-13-71\n\nBoʼlim davlat ijrochilar raqami:\n+998994344404 Z.S.Temirov\n+998994830888 X.X.Pirmatov\n+998975385800 B.Sh.Ergasheva\n+998994797001 B.K.Toʼlqinov\n+998888781441 T.F.Boltoboev\n+998981261701 А.S.Xamidov\n+998974012332 F.T.Yuldasheva\n+998981171069 А.D.Maxkamov\n\n\nKantselyariya: +998977342955	Контактный телефон отдела: (0370)552-13-71\n\nИсполнительный номер департамента штата:\n+998994344404 Темиров З.С.\n+998994830888 Пирматов Х.К.\n+998975385800 Б. Ш. Эргашева\n+998994797001 Б.К.Толкинов\n+998888781441 Болтобоев Т.Ф.\n+998981261701 Хамидов А.С.\n+998974012332 Юлдашева Ф.Т.\n+998981171069 Махкамов А.Д.\n\n\nОфис: +998977342955	Бўлим алоқа рақами: (0370)552-13-71\n\nБўлим давлат ижрочилар рақами:\n+998994344404        З.С.Темиров\n+998994830888        Х.Х.Пирматов\n+998975385800        Б.Ш.Эргашева\n+998994797001        Б.К.Тўлқинов\n+998888781441        Т.Ф.Болтобоев\n+998981261701       А.С.Хамидов\n+998974012332        Ф.Т.Юлдашева\n+998981171069        А.Д.Махкамов\n\n\nКанцелярия: +998977342955	Department contact phone: (0370)552-13-71\n\nState Department Executive Number:\n+998994344404 Temirov Z.S.\n+998994830888 Pirmatov Kh.K.\n+998975385800 B. Sh. Ergasheva\n+998994797001 B.K. Tolkinov\n+998888781441 Boltoboev T.F.\n+998981261701 Khamidov A.S.\n+998974012332 Yuldasheva F.T.\n+998981171069 Makhkamov A.D.\n\n\nOffice: +998977342955	\N		2022-09-13 02:26:09.472+05	2022-09-13 02:26:09.472+05	OqqorgonSendT
17	Parkent tumani	Паркентский район	Паркент тумани	Parkent district	Boʼlim aloqa raqami:(0370)700-26-04\n\nBoʼlim davlat ijrochilar raqami:\n+998977508010 А.S.Mansurov\n+998990499919 А.А.Dalabaev\n+998973474994 M.R.Umarov\n+998974440875 D.R.Shoyakubov\n+998946970088 Yu.M.Muhamedjanova\n\n\nKantselyariya: +998948422717	Контактный телефон отдела: (0370)700-26-04\n\nИсполнительный номер департамента штата:\n+998977508010 Мансуров А.С.\n+998990499919 Далабаев А.А.\n+998973474994 Умаров М.Р.\n+998974440875 Шоякубов Д.Р.\n+998946970088 Мухамеджанова Ю.М.\n\n\nОфис: +998948422717	Бўлим алоқа рақами:(0370)700-26-04\n\nБўлим давлат ижрочилар рақами:\n+998977508010   А.С.Мансуров\n+998990499919   А.А.Далабаев\n+998973474994   М.Р.Умаров\n+998974440875   Д.Р.Шоякубов\n+998946970088   Ю.М.Муҳамеджанова\n\n\nКанцелярия: +998948422717	Contact phone of the department: (0370) 700-26-04\n\nState Department Executive Number:\n+998977508010 Mansurov A.S.\n+998990499919 Dalabaev A.A.\n+998973474994 Umarov M.R.\n+998974440875 Shoyakubov D.R.\n+998946970088 Yu.M. Mukhamedzhanova\n\n\nOffice: +998948422717	\N		2022-09-13 02:31:17.288+05	2022-09-13 02:31:17.288+05	ParkentSendT
4	Bo'ka tumani	Бокинский район	Бўка тумани	Boka district	Boʼlim aloqa raqami: (0370)615-27-94\n\nBoʼlim davlat ijrochilar raqami:\n+998994022531 M.B.Musaxonov \n+998977669419 U.Gʼ.Mirshamshiev \n+998944072376 O.B.Botirov \n+998888779967 Gʼ.Oʼ.Аbduqayumov\n+998994041615 D.M.Rasulov \n+998998590379 I.Shomurodov \n+998991367744 F.P.Xaydarov \n+998944010321 Sh.U.Eshnazariy \n+998937026032 B.А.Xoʼjamkuliev 	Контактный телефон отдела: (0370)615-27-94\n\nИсполнительный номер департамента штата:\n+998994022531 Мусахонов М.Б.\n+998977669419 Миршамшиев У.Г.\n+998944072376 Ботиров О.Б.\n+998888779967 Г.О.Абдукаюмов\n+998994041615 Расулов ​​Д.М.\n+998998590379 И. Шомуродов\n+998991367744 Хайдаров Ф.П.\n+998944010321 Ш.У.Эшназари\n+998937026032 Ходжамкулиев Б.А.	Бўлим алоқа рақами: (0370)615-27-94\n\nБўлим давлат ижрочилар рақами:\n+998994022531        М.Б.Мусахонов \n+998977669419        У.Ғ.Миршамшиев \n+998944072376        О.Б.Ботиров \n+998888779967        Ғ.Ў.Абдуқаюмов\n+998994041615        Д.М.Расулов \n+998998590379        И.Шомуродов \n+998991367744        Ф.П.Хайдаров \n+998944010321        Ш.У.Эшназарий \n+998937026032        Б.А.Хўжамкулиев 	Contact phone of the department: (0370) 615-27-94\n\nState Department Executive Number:\n+998994022531 Musakhonov M.B.\n+998977669419 Mirshamshiev U.G.\n+998944072376 Botirov O.B.\n+998888779967 G.O.Abdukayumov\n+998994041615 Rasulov D.M.\n+998998590379 I. Shomurodov\n+998991367744 Khaydarov F.P.\n+998944010321 Sh.U.Eshnazari\n+998937026032 Khodzhamkuliev B.A.	\N		2022-09-13 02:06:48.487+05	2022-09-13 02:06:48.487+05	BokaSendT
5	Bo'stonlik tumani	Бостанлыкский район	Бўстонлик тумани	Boston district	Boʼlim aloqa raqami: (0370)742-22-00\n\nBoʼlim davlat ijrochilar raqami:\n+998334274744 M.А.Аbdulazizova\n+998974800075 D.E.Islamov\n+998993773717 F.K.Madjitov\n+998981264909 А.А.Usmanov\n+998973470303 S.Zokirov\n+998931878776 Sh.K.Raximov\n+998903301553 N.M.Malikova\n+998983645775 J.R.Yuldashev\n+998888777714 D.M.Toxirov\n\n\nKantselyariya:(0370)742-22-00	Контактный телефон отдела: (0370)742-22-00\n\nИсполнительный номер департамента штата:\n+998334274744 Абдулазизова М.А.\n+998974800075 Исламов Д.Э.\n+998993773717 Маджитов Ф.К.\n+998981264909 Усманов А.А.\n+998973470303 С.Зокиров\n+998931878776 Рахимов Ш.К.\n+998903301553 Маликова Н.М.\n+998983645775 Юлдашев Ю.Р.\n+998888777714 Тохиров Д.М.\n\n\nОфис: (0370)742-22-00	Бўлим алоқа рақами: (0370)742-22-00\n\nБўлим давлат ижрочилар рақами:\n+998334274744        М.А.Абдулазизова\n+998974800075        Д.Э.Исламов\n+998993773717        Ф.К.Маджитов\n+998981264909        А.А.Усманов\n+998973470303        С.Зокиров\n+998931878776       Ш.К.Рахимов\n+998903301553        Н.М.Маликова\n+998983645775        Ж.Р.Юлдашев\n+998888777714        Д.М.Тохиров\n\n\nКанцелярия: (0370)742-22-00	Department contact phone: (0370) 742-22-00\n\nState Department Executive Number:\n+998334274744 Abdulazizova M.A.\n+998974800075 Islamov D.E.\n+998993773717 Madzhitov F.K.\n+998981264909 Usmanov A.A.\n+998973470303 S.Zokirov\n+998931878776 Rakhimov Sh.K.\n+998903301553 Malikova N.M.\n+998983645775 Yuldashev Yu.R.\n+998888777714 Tokhirov D.M.\n\n\nOffice: (0370)742-22-00	\N		2022-09-13 02:08:56.938+05	2022-09-13 02:08:56.938+05	BostonlikSendT
16	Ohangaron tumani	Охангаронский район	Оҳангарон тумани	Ahangaron district	Boʼlim aloqa raqami: (0370)645-27-65\n\nBoʼlim davlat ijrochilar raqami:\n+998949222262 J.D.Mamatov\n+998949450557 M.O.Esanova\n+998998912888 X.А.Turmatov\n+998997941819 I.E.Kuziev\n+998936290082 А.M.Usubaliev\n+998946904994 А.N.Tursunov\n+998981009705 N.B.Ernazarova\n\n\nKantselyariya: +998994020209	Контактный телефон отдела: (0370)645-27-65\n\nИсполнительный номер департамента штата:\n+998949222262 Маматов Ж.Д.\n+998949450557 Эсанова М.О.\n+998998912888 Турматов Ха.А.\n+998997941819 Кузиев И.Е.\n+998936290082 Усубалиев А.М.\n+998946904994 Турсунов А.Н.\n+998981009705 Эрназарова Н.Б.\n\n\nОфис: +998994020209	Бўлим алоқа рақами: (0370)645-27-65\n\nБўлим давлат ижрочилар рақами:\n+998949222262        Ж.Д.Маматов\n+998949450557        М.О.Эсанова\n+998998912888        Х.А.Турматов\n+998997941819        И.Э.Кузиев\n+998936290082        А.М.Усубалиев\n+998946904994        А.Н.Турсунов\n+998981009705        Н.Б.Эрназарова\n\n\nКанцелярия: +998994020209	Department contact phone: (0370) 645-27-65\n\nState Department Executive Number:\n+998949222262 Zh.D. Mamatov\n+998949450557 Esanova M.O.\n+998998912888 Turmatov Kha.A.\n+998997941819 Kuziev I.E.\n+998936290082 Usubaliev A.M.\n+998946904994 Tursunov A.N.\n+998981009705 Ernazarova N.B.\n\n\nOffice: +998994020209	\N		2022-09-13 02:29:50.287+05	2022-09-13 02:29:50.287+05	OhangaronSendT
18	Pskent tumani	Пскентский район	Пскент тумани	Pskent district	Boʼlim aloqa raqami: (0370) 71-231-11-07\n\nBoʼlim davlat ijrochilar raqami:\n+998994022531 F.B.Mamatov \n+998977669419 J.M.Tursunov \n+998944072376 А.Q.Raximjonov\n+998888779967 D.А.Djaparov\n+998994041615 А.E.Esanov \n+998998590379 T.I.Narziev \n+998991367744 Sh.T.Аbdullaev \n+998944010321 D.А.Аxmedov 	Контактный телефон отдела: (0370) 71-231-11-07\n\nИсполнительный номер департамента штата:\n+998994022531 Маматов Ф.Б.\n+998977669419 Турсунов Ж.М.\n+998944072376 Рахимжонов А.К.\n+998888779967 Джапаров Д.А.\n+998994041615 Эсанов А.Е.\n+998998590379 Нарзиев Т.И.\n+998991367744 Ш.Т.Абдуллаев\n+998944010321 Ахмедов Д.А.	Бўлим алоқа рақами: (0370) 71-231-11-07\n\nБўлим давлат ижрочилар рақами:\n+998994022531        Ф.Б.Маматов  \n+998977669419        Ж.М.Турсунов  \n+998944072376        А.Қ.Рахимжонов\n+998888779967        Д.А.Джапаров\n+998994041615        А.Э.Эсанов  \n+998998590379        Т.И.Нарзиев  \n+998991367744        Ш.Т.Абдуллаев \n+998944010321        Д.А.Ахмедов 	Department contact phone: (0370) 71-231-11-07\n\nState Department Executive Number:\n+998994022531 Mamatov F.B.\n+998977669419 Tursunov Zh.M.\n+998944072376 Rakhimjonov A.K.\n+998888779967 Dzhaparov D.A.\n+998994041615 Esanov A.E.\n+998998590379 Narziev T.I.\n+998991367744 Sh.T.Abdullaev\n+998944010321 Akhmedov D.A.	\N		2022-09-13 02:32:45.031+05	2022-09-13 02:32:45.031+05	PskentSendT
19	Toshkent tumani	Ташкентский район	Ташкент тумани	Tаshkent district	Boʼlim aloqa raqami: (0370)965-35-60\n\nBoʼlim davlat ijrochilar raqami:\n+998972638877 J.Z.Аbduvaliev\n+998981018283 А.Z.Pirmatov\n+998977194544 А.А.Ismagilov\n+998332071107 X.R.Xasanxoʼjaev\n+998977027737 Sh.Sh.Turgunov\n+998977096076 Sh.Sh.Shermatov\n+998913393015 K.Sh.Narziev\n+998909026006 U.А.Sabirdjanov\n+998977170683 X.T.Usmanov\n+998983079888 Sh.I.Yulchiev\n+998977585544 D.J.Kurbonov\n+998999310222 J.O.Ergashev\n+998983016660 D.А.Xidirov\n\n\nKantselyariya: +998997810099	Контактный телефон отдела: (0370)965-35-60\n\nИсполнительный номер департамента штата:\n+998972638877 Абдувалиев Ж.З.\n+998981018283 Пирматов А.З.\n+998977194544 Исмагилов А.А.\n+998332071107 Хасанходжаев Х.Р.\n+998977027737 Ш.Ш.Тургунов\n+998977096076 Шерматов Ш.Ш.\n+998913393015 Нарзиев К.Ш.\n+998909026006 У.А.Сабирджанов\n+998977170683 Х.Т.Усманов\n+998983079888 Юльчиев Ш.И.\n+998977585544 Курбанов Д.Ж.\n+998999310222 Эргашев Ю.О.\n+998983016660 Д.А.Хидиров\n\n\nОфис: +998997810099	Бўлим алоқа рақами: (0370)965-35-60\n\nБўлим давлат ижрочилар рақами:\n+998972638877        Ж.З.Абдувалиев\n+998981018283        А.З.Пирматов\n+998977194544        А.А.Исмагилов\n+998332071107        Х.Р.Хасанхўжаев\n+998977027737        Ш.Ш.Тургунов\n+998977096076        Ш.Ш.Шерматов\n+998913393015        К.Ш.Нарзиев\n+998909026006        У.А.Сабирджанов\n+998977170683       Х.Т.Усманов\n+998983079888        Ш.И.Юлчиев\n+998977585544        Д.Ж.Курбонов\n+998999310222       Ж.О.Эргашев\n+998983016660        Д.А.Хидиров\n\n\nКанцелярия: +998997810099	Department contact phone: (0370)965-35-60\n\nState Department Executive Number:\n+998972638877 Abduvaliev Zh.Z.\n+998981018283 Pirmatov A.Z.\n+998977194544 Ismagilov A.A.\n+998332071107 Khasankhodzhaev Kh.R.\n+998977027737 Sh.Sh.Turgunov\n+998977096076 Shermatov Sh.Sh.\n+998913393015 Narziev K.Sh.\n+998909026006 U.A. Sabirdzhanov\n+998977170683 Kh.T.Usmanov\n+998983079888 Yulchiev Sh.I.\n+998977585544 Kurbanov D.Zh.\n+998999310222 Ergashev Yu.O.\n+998983016660 D.A. Khidirov\n\n\nOffice: +998997810099	\N		2022-09-13 02:34:34.009+05	2022-09-13 02:34:34.009+05	ToshkentSendT
20	Chinoz tumani	Чиназский район	Чиноз тумани	Chinaz district	Boʼlim aloqa raqami: (0370)593-63-41\n\nBoʼlim davlat ijrochilar raqami:\n+998994464407 G.Sh.Baimuxamedov\n+998944012555 S.I.Tuxtamishev\n+998978711155 K.M.Fozilova\n+998980772014 F.D.Eshtemirov\n+998909204767 S.А.Nasretdinov\n+998977078711 U.T.Yuldasheva\n+998974647794 O.I.Ismoilov\n+998931686659 Yu.B.Ramankulov\n\n\nKantselyariya: +998978711155	Контактный телефон отдела: (0370)593-63-41\n\nИсполнительный номер департамента штата:\n+998994464407 Баймухамедов Г.Ш.\n+998944012555 Тухтамишев С.И.\n+998978711155 Фозилова К.М.\n+998980772014 Эштемиров Ф.Д.\n+998909204767 Насретдинов С.А.\n+998977078711 Юлдашева Ю.Т.\n+998974647794 Исмаилов О.И.\n+998931686659 Раманкулов Ю.Б.\n\n\nОфис: +998978711155	Бўлим алоқа рақами: (0370)593-63-41\n\nБўлим давлат ижрочилар рақами:\n+998994464407        Г.Ш.Баимухамедов\n+998944012555        С.И.Тухтамишев\n+998978711155        К.М.Фозилова\n+998980772014        Ф.Д.Эштемиров\n+998909204767        С.А.Насретдинов\n+998977078711        У.Т.Юлдашева\n+998974647794        О.И.Исмоилов\n+998931686659        Ю.Б.Раманкулов\n\n\nКанцелярия: +998978711155	Department contact phone: (0370)593-63-41\n\nState Department Executive Number:\n+998994464407 Baymukhamedov G.Sh.\n+998944012555 Tukhtamishev S.I.\n+998978711155 Fozilova K.M.\n+998980772014 Eshtemirov F.D.\n+998909204767 Nasretdinov S.A.\n+998977078711 Yuldasheva Yu.T.\n+998974647794 Ismailov O.I.\n+998931686659 Ramankulov Yu.B.\n\n\nOffice: +998978711155	\N		2022-09-13 02:36:47.857+05	2022-09-13 02:36:47.857+05	ChinozSendT
3	Bekobod tumani	Бекабадский район 	Бекобод тумани	Bekobad district	Boʼlim aloqa raqami:(0370)935-21-78\n\nBoʼlim davlat ijrochilar raqami:\n+998999207494 J.S.Fuzailov\n+998998882184 Oʼ.R.Begmuratov\n+998974280104 B.А.Umarov\n+998990126962 T.F.Qoʼziboev\n+998946015218 O.Z.Qoʼziev\n+998944010321 Sh.U.Eshnazariy\n+998949110809 J.Sh.Uskenboev\n+998992351008 M.B.Karabaev\n+998974280109 J.Sh.Sobirjonov\n+998992351009 Sh.M.Xakimov\n+998974294342 I.N.Erkinov\n\n\nKantselyariya: +998949473944	Контактный телефон отдела: (0370)935-21-78\n\nИсполнительный номер департамента штата:\n+998999207494 Фузайлов Ж.С.\n+998998882184 Бегмуратов О.Р.\n+998974280104 Умаров Б.А.\n+998990126962 Кожибоев Т.Ф.\n+998946015218 Кожиев О.З.\n+998944010321 Ш.У.Эшназари\n+998949110809 Ускенбоев Ж.Ш.\n+998992351008 Карабаев М.Б.\n+998974280109 Ж. Ш. Собиржанов\n+998992351009 Хакимов Ш.М.\n+998974294342 Эркинов И.Н.\n\n\nОфис: +998949473944	Бўлим алоқа рақами:(0370)935-21-78\n\nБўлим давлат ижрочилар рақами:\n+998999207494   Ж.С.Фузаилов\n+998998882184   Ў.Р.Бегмуратов\n+998974280104   Б.А.Умаров\n+998990126962   Т.Ф.Қўзибоев\n+998946015218   О.З.Қўзиев\n+998944010321   Ш.У.Эшназарий\n+998949110809   Ж.Ш.Ускенбоев\n+998992351008   М.Б.Карабаев\n+998974280109   Ж.Ш.Собиржонов\n+998992351009   Ш.М.Хакимов\n+998974294342   И.Н.Эркинов\n\n\nКанцелярия: +998949473944	Department contact phone: (0370)935-21-78\n\nState Department Executive Number:\n+998999207494 Fuzailov Zh.S.\n+998998882184 Begmuratov O.R.\n+998974280104 Umarov B.A.\n+998990126962 Kozhiboev T.F.\n+998946015218 Kozhiev O.Z.\n+998944010321 Sh.U.Eshnazari\n+998949110809 Uskenboev Zh.Sh.\n+998992351008 Karabaev M.B.\n+998974280109 Zh. Sh. Sobirzhanov\n+998992351009 Khakimov Sh.M.\n+998974294342 Erkinov I.N.\n\n\nOffice: +998949473944	\N		2022-09-13 02:05:13.906+05	2022-09-13 02:05:13.906+05	BekobodSendT
12	Nurafshon shahri	город Нурафшан	Нурафшон шаҳри	Nurafshon city	Boʼlim aloqa raqami:(0370)700-26-04\n\nBoʼlim davlat ijrochilar raqami:\n+998998884109 U.Y.Yoʼldoshev\n+998909781700 Sh.А.Xolikova\n+998973770076 E.Ya.Doniev\n+998998212112 N.X.Pirmuxamedov\n+998909257090 F.R.Temirov\n\nKantselyariya: +998998781523	Контактный телефон отдела: (0370)700-26-04\n\nИсполнительный номер департамента штата:\n+998998884109 Юлдошев Ю.Ю.\n+998909781700 Холикова Ш.А.\n+998973770076 Э. Я. Дониев\n+998998212112 Пирмухамедов Н.Х.\n+998909257090 Темиров Ф.Р.\n\nОфис: +998998781523	Бўлим алоқа рақами:(0370)700-26-04\n\nБўлим давлат ижрочилар рақами:\n+998998884109   У.Й.Йўлдошев\n+998909781700   Ш.А.Холикова\n+998973770076   Э.Я.Дониев\n+998998212112   Н.Х.Пирмухамедов\n+998909257090   Ф.Р.Темиров\n\nКанцелярия: +998998781523	Contact phone of the department: (0370) 700-26-04\n\nState Department Executive Number:\n+998998884109 Yuldoshev Yu.Yu.\n+998909781700 Kholikova Sh.A.\n+998973770076 E. Ya. Doniev\n+998998212112 Pirmukhamedov N.Kh.\n+998909257090 Temirov F.R.\n\nOffice: +998998781523	\N		2022-09-13 02:24:37.888+05	2022-09-13 02:24:37.888+05	NurafshonSend
21	Yangiyo'l shahri	город Янгиюль	Янгийўл шаҳри	Yangiyul city	Boʼlim aloqa raqami:(0370)602-90-62\n\nBoʼlim davlat ijrochilar raqami:\n+998974075511 F.А.Аkbarova\n+998990205410 I.M.Mirxamidov\n+998983036662 А.А.Kayumov\n+998888750007 А.А.Sayfullaev\n+998901889829 А.K.Oʼngʼarov\n+998998292116 B.N.Sherqulov\n\nKantselyariya: +998900111041	Контактный телефон отдела: (0370)602-90-62\n\nИсполнительный номер департамента штата:\n+998974075511 Акбарова Ф.А.\n+998990205410 Мирхамидов И.М.\n+998983036662 А.А.Каюмов\n+998888750007 Сайфуллаев А.А.\n+998901889829 Онгаров А.К.\n+998998292116 Шеркулов Б.Н.\n\nОфис: +998900111041	Бўлим алоқа рақами:(0370)602-90-62\n\nБўлим давлат ижрочилар рақами:\n+998974075511   Ф.А.Акбарова\n+998990205410   И.М.Мирхамидов\n+998983036662   А.А.Каюмов\n+998888750007   А.А.Сайфуллаев\n+998901889829   А.К.Ўнғаров\n+998998292116   Б.Н.Шерқулов\n\nКанцелярия: +998900111041	Contact phone of the department: (0370) 602-90-62\n\nState Department Executive Number:\n+998974075511 Akbarova F.A.\n+998990205410 Mirkhamidov I.M.\n+998983036662 A.A. Kayumov\n+998888750007 Sayfullaev A.A.\n+998901889829 Ongarov A.K.\n+998998292116 Sherkulov B.N.\n\nOffice: +998900111041	\N		2022-09-13 02:39:01.415+05	2022-09-13 02:39:01.415+05	YangiyolSend
1	Angren shahri	город Ангрен	Aнгрен шаҳри	Angren city	Boʼlim aloqa raqami:(0370) 662-71-86\n\nBoʼlim davlat ijrochilar raqami:\n+998946326353 D.А.Djaparov\n+998946881007 D.А.Komilov\n+998994928797 F.А.Nishonov\n+998932216633 А.А.Аbduraimov\n+998991501009 А.А.Аvabakirov\n+998998933282 F.B.Mamatov\n+998949291110 Yu.А.Xaydarov\n+998930000405 O.U.Mirxalikov\n+998998333928 M.Z.Urinboev\n+998980077181 D.А.Sultonboev\n+998938400705 S.R.Djumadillaeva\n\n\nKantselyariya: +998999770560	Контактный телефон отдела: (0370) 662-71-86\n\nИсполнительный номер департамента штата:\n+998946326353 Д.А.Джапаров\n+998946881007 Комилов Д.А.\n+998994928797 Нишонов Ф.А.\n+998932216633 Абдураимов А.А.\n+998991501009 Авабакиров А.А.\n+998998933282 Маматов Ф.Б.\n+998949291110 Хайдаров Ю.А.\n+998930000405 Мирхаликов О.Ю.\n+998998333928 М.З.Уринбоев\n+998980077181 Султонбоев Д.А.\n+998938400705 Джумадиллаева С.Р.\n\n\nОфис: +998999770560	Бўлим алоқа рақами:(0370) 662-71-86\n\nБўлим давлат ижрочилар рақами:\n+998946326353   Д.А.Джапаров\n+998946881007   Д.А.Комилов\n+998994928797   Ф.А.Нишонов\n+998932216633   А.А.Абдураимов\n+998991501009   А.А.Авабакиров\n+998998933282   Ф.Б.Маматов\n+998949291110   Ю.А.Хайдаров\n+998930000405   О.У.Мирхаликов\n+998998333928   М.З.Уринбоев\n+998980077181   Д.А.Султонбоев\n+998938400705   С.Р.Джумадиллаева\n\n\nКанцелярия: +998999770560	Department contact phone: (0370) 662-71-86\n\nState Department Executive Number:\n+998946326353 D.A.Dzhaparov\n+998946881007 Komilov D.A.\n+998994928797 Nishonov F.A.\n+998932216633 Abduraimov A.A.\n+998991501009 Avabakirov A.A.\n+998998933282 Mamatov F.B.\n+998949291110 Khaydarov Yu.A.\n+998930000405 Mirkhalikov O.Yu.\n+998998333928 M.Z.Urinboev\n+998980077181 Sultonboev D.A.\n+998938400705 Dzhumadillaeva S.R.\n\n\nOffice: +998999770560	\N		2022-09-13 01:59:42.851+05	2022-09-13 01:59:42.851+05	AngrenSend
22	Yangiyo'l tumani	Янгиюльский район	Янгийўл тумани	Yangiyul district	Boʼlim aloqa raqami:(0370)602-32-35\n\nBoʼlim davlat ijrochilar raqami:\n+998972490222 B.А.Baimatov\n+998981234757 I.А.Ibroximov\n+998950622486 Z.А.Kulmanov\n+998996338844 D.N.Miniyorov\n+998975987887 J.M.Xolmuxamedov\n+998905670307 B.I.Аbduraxmonov\n+998971144334 B.А.Sidikov\n+998999340330 B.А.Mamarasulov\n+998946666862 B.R.Xasanxoʼjaev\n+998991090434 Sh.B.Buranova\n\n\nKantselyariya: +998998839775	Контактный телефон отдела: (0370)602-32-35\n\nИсполнительный номер департамента штата:\n+998972490222 Байматов Б.А.\n+998981234757 Иброхимов И.А.\n+998950622486 Кульманов З.А.\n+998996338844 Миниёров Д.Н.\n+998975987887 Холмухамедов Ж.М.\n+998905670307 Абдурахманов Б.И.\n+998971144334 Сидиков Б.А.\n+998999340330 Мамарасулов ​​Б.А.\n+998946666862 Хасанходжаев Б.Р.\n+998991090434 Буранова Ш.Б.\n\n\nОфис: +998998839775	Бўлим алоқа рақами:(0370)602-32-35\n\nБўлим давлат ижрочилар рақами:\n+998972490222   Б.А.Баиматов\n+998981234757   И.А.Иброхимов\n+998950622486   З.А.Кулманов\n+998996338844   Д.Н.Миниёров\n+998975987887   Ж.М.Холмухамедов\n+998905670307   Б.И.Абдурахмонов\n+998971144334   Б.А.Сидиков\n+998999340330   Б.А.Мамарасулов\n+998946666862   Б.Р.Хасанхўжаев\n+998991090434   Ш.Б.Буранова\n\n\nКанцелярия: +998998839775	Department contact phone: (0370) 602-32-35\n\nState Department Executive Number:\n+998972490222 Baimatov B.A.\n+998981234757 Ibrohimov I.A.\n+998950622486 Kulmanov Z.A.\n+998996338844 Miniyorov D.N.\n+998975987887 Holmukhamedov Zh.M.\n+998905670307 Abdurakhmanov B.I.\n+998971144334 Sidikov B.A.\n+998999340330 Mamarasulov B.A.\n+998946666862 Khasankhodzhaev B.R.\n+998991090434 Buranova Sh.B.\n\n\nOffice: +998998839775	\N		2022-09-13 02:42:48.673+05	2022-09-13 02:42:48.673+05	YangiyolSendT
14	Olmaliq shahri	город Алмалык	Олмалиқ шаҳри	Almalyk city	Boʼlim aloqa raqami: (0370)615-17-89\n\nBoʼlim davlat ijrochilar raqami:\n+998993017041 Z.F.Ortiqova\n+998970130087 B.X.Dosov\n+998977267771 S.M.Xushvaqov\n+998942014224 Z.А.Tajieva\n+998994027609 M.А.Eshboev\n+998995107118 F.F.Umarov\n+998950843435 Sh.B.Nematov\n+998998858265 А.X.Roxatov\n+998944064634 Z.M.Saypullaev\n+998998707250 Oʼ.I.Muxammedjanov\n\n\nKantselyariya: +998977712008	Контактный телефон отдела: (0370)615-17-89\n\nИсполнительный номер департамента штата:\n+998993017041 Ортикова З.Ф.\n+998970130087 Б. Х. Досов\n+998977267771 С.М.Хушваков\n+998942014224 Таджиева З.А.\n+998994027609 Эшбоев М.А.\n+998995107118 Умаров Ф.Ф.\n+998950843435 Нематов Ш.Б.\n+998998858265 Рохатов А.К.\n+998944064634 Сайпуллаев З.М.\n+998998707250 Мухаммеджанов О.И.\n\n\nОфис: +998977712008	Бўлим алоқа рақами: (0370)615-17-89\n\nБўлим давлат ижрочилар рақами:\n+998993017041        З.Ф.Ортиқова\n+998970130087        Б.Х.Досов\n+998977267771        С.М.Хушвақов\n+998942014224        З.А.Тажиева\n+998994027609        М.А.Эшбоев\n+998995107118        Ф.Ф.Умаров\n+998950843435        Ш.Б.Нематов\n+998998858265        А.Х.Рохатов\n+998944064634        З.М.Сайпуллаев\n+998998707250        Ў.И.Мухаммеджанов\n\n\nКанцелярия: +998977712008	Department contact phone: (0370)615-17-89\n\nState Department Executive Number:\n+998993017041 Ortikova Z.F.\n+998970130087 B. Kh. Dosov\n+998977267771 S.M. Khushvakov\n+998942014224 Tadzhieva Z.A.\n+998994027609 Eshboev M.A.\n+998995107118 Umarov F.F.\n+998950843435 Nematov Sh.B.\n+998998858265 Rokhatov A.K.\n+998944064634 Saypullaev Z.M.\n+998998707250 Mukhammedzhanov O.I.\n\n\nOffice: +998977712008	\N		2022-09-13 02:27:19.71+05	2022-09-13 02:27:19.71+05	OlmaliqSend
15	Ohangaron shahri	город Оҳангаран	Оҳангарон шаҳри	Ahangaron city	Boʼlim aloqa raqami:(0370)645-25-11\n\nBoʼlim davlat ijrochilar raqami:\n+998943190016 N.Z.Аzimboeva\n+998939227722 X.U.Djumaboev\n+998998381041 M.E.Mamanazarov\n+998978721818 D.B.Turanov\n+998949259515 А.M.Rustamov\n\n\nKantselyariya: +998944477117	Контактный телефон отдела: (0370)645-25-11\n\nИсполнительный номер департамента штата:\n+998943190016 Н.З.Азимбоева\n+998939227722 Джумабоев Х.У.\n+998998381041 Маманазаров М.Э.\n+998978721818 Туранов Д.Б.\n+998949259515 Рустамов А.М.\n\n\nОфис: +998944477117	Бўлим алоқа рақами:(0370)645-25-11\n\nБўлим давлат ижрочилар рақами:\n+998943190016   Н.З.Азимбоева\n+998939227722   Х.У.Джумабоев\n+998998381041   М.Э.Маманазаров\n+998978721818   Д.Б.Туранов\n+998949259515   А.М.Рустамов\n\n\nКанцелярия: +998944477117	Department contact phone: (0370) 645-25-11\n\nState Department Executive Number:\n+998943190016 N.Z. Azimboeva\n+998939227722 Jumaboev H.U.\n+998998381041 Mamanazarov M.E.\n+998978721818 Turanov D.B.\n+998949259515 Rustamov A.M.\n\n\nOffice: +998944477117	\N		2022-09-13 02:28:33.589+05	2022-09-13 02:28:33.589+05	OhangaronSend
\.


--
-- Data for Name: Reception; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reception" (id, "chatId", passport, phone, description, "districtId", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: TelegramMembers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TelegramMembers" (id, "chatId", name, phone, "districtId", lang, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, phone, password, role, "districtId", status, "createdAt", "updatedAt", "chatId") FROM stdin;
11	+998998207910	123456	Ijrochi	8	0	2022-09-13 21:32:36.465+05	2022-09-13 21:32:36.465+05	-11
12	+998994072070	123456	Ijrochi	9	0	2022-09-13 21:32:58.606+05	2022-09-13 21:32:58.606+05	-12
3	+998992041107	123456	Kansilyariya	0	0	2022-09-13 21:29:14.101+05	2022-09-13 21:29:14.101+05	-3
4	+998937020111	123456	Ijrochi	1	0	2022-09-13 21:30:40.906+05	2022-09-13 21:30:40.906+05	-4
5	+998974280102	123456	Ijrochi	2	0	2022-09-13 21:30:54.769+05	2022-09-13 21:30:54.769+05	-5
6	+998909347474	123456	Ijrochi	3	0	2022-09-13 21:31:11.79+05	2022-09-13 21:31:11.79+05	-6
7	+998908190701	123456	Ijrochi	4	0	2022-09-13 21:31:30.628+05	2022-09-13 21:31:30.628+05	-7
8	+998908080585	123456	Ijrochi	5	0	2022-09-13 21:31:50.384+05	2022-09-13 21:31:50.384+05	-8
9	+998998344545	123456	Ijrochi	6	0	2022-09-13 21:32:04.127+05	2022-09-13 21:32:04.127+05	-9
10	+998909730880	123456	Ijrochi	7	0	2022-09-13 21:32:18.976+05	2022-09-13 21:32:18.976+05	-10
13	+998998652130	123456	Ijrochi	10	0	2022-09-13 21:33:16.847+05	2022-09-13 21:33:16.847+05	-13
14	+998909660959	123456	Ijrochi	11	0	2022-09-13 21:33:33.191+05	2022-09-13 21:33:33.191+05	-14
15	+998975480001	123456	Ijrochi	12	0	2022-09-13 21:33:49.055+05	2022-09-13 21:33:49.055+05	-15
16	+998977441221	123456	Ijrochi	13	0	2022-09-13 21:34:01.135+05	2022-09-13 21:34:01.135+05	-16
17	+998976257727	123456	Ijrochi	14	0	2022-09-13 21:34:12.946+05	2022-09-13 21:34:12.946+05	-17
18	+998909364884	123456	Ijrochi	15	0	2022-09-13 21:34:26.272+05	2022-09-13 21:34:26.272+05	-18
19	+998946789077	123456	Ijrochi	16	0	2022-09-13 21:34:37.013+05	2022-09-13 21:34:37.013+05	-19
20	+998998781523	123456	Ijrochi	17	0	2022-09-13 21:34:50.045+05	2022-09-13 21:34:50.045+05	-20
21	+998935850008	123456	Ijrochi	18	0	2022-09-13 21:35:07.514+05	2022-09-13 21:35:07.514+05	-21
22	+998998110702	123456	Ijrochi	19	0	2022-09-13 21:35:19.188+05	2022-09-13 21:35:19.188+05	-22
23	+998974480100	123456	Ijrochi	20	0	2022-09-13 21:35:39.885+05	2022-09-13 21:35:39.885+05	-23
24	+998998201619	123456	Ijrochi	21	0	2022-09-13 21:35:54.703+05	2022-09-13 21:35:54.703+05	-24
25	+998998280110	123456	Ijrochi	22	0	2022-09-13 21:36:06.362+05	2022-09-13 21:36:06.362+05	-25
2	+998974700014	123456	Director	0	0	2022-09-13 21:28:41.347+05	2022-09-21 00:56:39.608+05	-2
1	+998949213838	123456	Admin	0	1	2022-09-13 21:28:37.163+05	2022-09-22 00:20:05.526+05	-1
\.


--
-- Name: Appel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Appel_id_seq"', 1, false);


--
-- Name: District_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."District_id_seq"', 23, true);


--
-- Name: Reception_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reception_id_seq"', 1, false);


--
-- Name: TelegramMembers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TelegramMembers_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 25, true);


--
-- Name: Appel Appel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appel"
    ADD CONSTRAINT "Appel_pkey" PRIMARY KEY (id);


--
-- Name: District District_descriptionUz_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_descriptionUz_key" UNIQUE ("descriptionUz");


--
-- Name: District District_nameUz_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_nameUz_key" UNIQUE ("nameUz");


--
-- Name: District District_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_pkey" PRIMARY KEY (id);


--
-- Name: Reception Reception_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reception"
    ADD CONSTRAINT "Reception_pkey" PRIMARY KEY (id);


--
-- Name: TelegramMembers TelegramMembers_chatId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TelegramMembers"
    ADD CONSTRAINT "TelegramMembers_chatId_key" UNIQUE ("chatId");


--
-- Name: TelegramMembers TelegramMembers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TelegramMembers"
    ADD CONSTRAINT "TelegramMembers_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_phone_key" UNIQUE (phone);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

