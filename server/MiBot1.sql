PGDMP                         z            MiBot    14.5    14.5 +               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                        0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            !           1262    16394    MiBot    DATABASE     d   CREATE DATABASE "MiBot" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "MiBot";
                postgres    false            �            1259    16436    Appel    TABLE       CREATE TABLE public."Appel" (
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
    DROP TABLE public."Appel";
       public         heap    postgres    false            �            1259    16435    Appel_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Appel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Appel_id_seq";
       public          postgres    false    210            "           0    0    Appel_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Appel_id_seq" OWNED BY public."Appel".id;
          public          postgres    false    209            �            1259    16505    District    TABLE     �  CREATE TABLE public."District" (
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
    DROP TABLE public."District";
       public         heap    postgres    false            �            1259    16504    District_id_seq    SEQUENCE     �   CREATE SEQUENCE public."District_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."District_id_seq";
       public          postgres    false    216            #           0    0    District_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."District_id_seq" OWNED BY public."District".id;
          public          postgres    false    215            �            1259    16488 	   Reception    TABLE       CREATE TABLE public."Reception" (
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
    DROP TABLE public."Reception";
       public         heap    postgres    false            �            1259    16487    Reception_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Reception_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Reception_id_seq";
       public          postgres    false    214            $           0    0    Reception_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Reception_id_seq" OWNED BY public."Reception".id;
          public          postgres    false    213            �            1259    16456    TelegramMembers    TABLE     !  CREATE TABLE public."TelegramMembers" (
    id integer NOT NULL,
    "chatId" bigint NOT NULL,
    name text,
    phone text,
    "districtId" integer NOT NULL,
    lang text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 %   DROP TABLE public."TelegramMembers";
       public         heap    postgres    false            �            1259    16455    TelegramMembers_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TelegramMembers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."TelegramMembers_id_seq";
       public          postgres    false    212            %           0    0    TelegramMembers_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."TelegramMembers_id_seq" OWNED BY public."TelegramMembers".id;
          public          postgres    false    211            �            1259    16741    Users    TABLE     >  CREATE TABLE public."Users" (
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
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16740    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    218            &           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    217            p           2604    25060    Appel id    DEFAULT     h   ALTER TABLE ONLY public."Appel" ALTER COLUMN id SET DEFAULT nextval('public."Appel_id_seq"'::regclass);
 9   ALTER TABLE public."Appel" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            s           2604    25069    District id    DEFAULT     n   ALTER TABLE ONLY public."District" ALTER COLUMN id SET DEFAULT nextval('public."District_id_seq"'::regclass);
 <   ALTER TABLE public."District" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            r           2604    25039    Reception id    DEFAULT     p   ALTER TABLE ONLY public."Reception" ALTER COLUMN id SET DEFAULT nextval('public."Reception_id_seq"'::regclass);
 =   ALTER TABLE public."Reception" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            q           2604    16459    TelegramMembers id    DEFAULT     |   ALTER TABLE ONLY public."TelegramMembers" ALTER COLUMN id SET DEFAULT nextval('public."TelegramMembers_id_seq"'::regclass);
 C   ALTER TABLE public."TelegramMembers" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            t           2604    25080    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218                      0    16436    Appel 
   TABLE DATA           }   COPY public."Appel" (id, "chatId", passport, phone, description, "districtId", status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   �2                 0    16505    District 
   TABLE DATA           �   COPY public."District" (id, "nameUz", "nameRu", "nameOz", "nameEn", "descriptionUz", "descriptionRu", "descriptionOz", "descriptionEn", phone, location, "createdAt", "updatedAt", command) FROM stdin;
    public          postgres    false    216   �2                 0    16488 	   Reception 
   TABLE DATA           �   COPY public."Reception" (id, "chatId", passport, phone, description, "districtId", status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   �]                 0    16456    TelegramMembers 
   TABLE DATA           t   COPY public."TelegramMembers" (id, "chatId", name, phone, "districtId", lang, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   1^                 0    16741    Users 
   TABLE DATA           v   COPY public."Users" (id, phone, password, role, "districtId", status, "createdAt", "updatedAt", "chatId") FROM stdin;
    public          postgres    false    218   �^       '           0    0    Appel_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Appel_id_seq"', 76, true);
          public          postgres    false    209            (           0    0    District_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."District_id_seq"', 23, true);
          public          postgres    false    215            )           0    0    Reception_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Reception_id_seq"', 22, true);
          public          postgres    false    213            *           0    0    TelegramMembers_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."TelegramMembers_id_seq"', 31, true);
          public          postgres    false    211            +           0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 25, true);
          public          postgres    false    217            v           2606    25062    Appel Appel_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Appel"
    ADD CONSTRAINT "Appel_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Appel" DROP CONSTRAINT "Appel_pkey";
       public            postgres    false    210            ~           2606    25018 #   District District_descriptionUz_key 
   CONSTRAINT     m   ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_descriptionUz_key" UNIQUE ("descriptionUz");
 Q   ALTER TABLE ONLY public."District" DROP CONSTRAINT "District_descriptionUz_key";
       public            postgres    false    216            �           2606    25016    District District_nameUz_key 
   CONSTRAINT     _   ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_nameUz_key" UNIQUE ("nameUz");
 J   ALTER TABLE ONLY public."District" DROP CONSTRAINT "District_nameUz_key";
       public            postgres    false    216            �           2606    25071    District District_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."District" DROP CONSTRAINT "District_pkey";
       public            postgres    false    216            |           2606    25041    Reception Reception_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Reception"
    ADD CONSTRAINT "Reception_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Reception" DROP CONSTRAINT "Reception_pkey";
       public            postgres    false    214            x           2606    16465 *   TelegramMembers TelegramMembers_chatId_key 
   CONSTRAINT     m   ALTER TABLE ONLY public."TelegramMembers"
    ADD CONSTRAINT "TelegramMembers_chatId_key" UNIQUE ("chatId");
 X   ALTER TABLE ONLY public."TelegramMembers" DROP CONSTRAINT "TelegramMembers_chatId_key";
       public            postgres    false    212            z           2606    16463 $   TelegramMembers TelegramMembers_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."TelegramMembers"
    ADD CONSTRAINT "TelegramMembers_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."TelegramMembers" DROP CONSTRAINT "TelegramMembers_pkey";
       public            postgres    false    212            �           2606    25091    Users Users_phone_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_phone_key" UNIQUE (phone);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_phone_key";
       public            postgres    false    218            �           2606    25082    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    218                  x������ � �            x��}[sG���+����U���7i�@� �C~i��Z�̒�����9���c����!�/f��1��%~��%'3�U�Kk	��`1tuuw~_efeee�Ss�k���V����S��/�>���>�?~7|�b��{>y��}&��/�u��N��~�������:�ח�����"��q�N��t�����nw��p�������:�����yw�_�����8�"8.V�pw�3��>T׊4.�(,�S��/���U}���0N�(��mb	�m���aY���v~u�¥�\�GF\;ݞ�����	ܕFE\¥3b���=����%��2X����;ݍއ5~뻛�������պ߽Z���$R�S�� ���>9?���m�߇��������^ �O�?�?=�	Z�9���������o�g���P��?����>
����}D���@���wC��oE0|�w�ѧď�}�_"M����g����~h�WM^��!��2�Z��A�?�=?�Gx���}?����
������u�X�+tx:�e��֥En�;|J/�Lࣩ3�]��������ݕ_Ч�|�J�����џ߅R����$������O�O�]����>�
"�@A���'��`����E�'��@!�¤�����������i�?}���~P��7V7���z���{�����j�Zڮ�Wv��+����������wD0;BI)E�ʗ��O���m�3b�:j�Ӣ���"eծ���ZjV*(|�S����}o՗ڻSSq�(�(	�x&Lf�X���K��wIY�%x�7�s���no���&�����g�w�z��y��	�j>��TT@�����Bwk��}o�� �/��������̫4��9� Nnm����u�CY�e��1\^+ k���8O��P��߬�fË*+��]ꈓb~�?_o��e����X��[�]{9� �8I�q��7W���I����%��_f.�I��U��:��Ş��qgY,�yq��ƞ�)�m�]K�-���Ҫ���hz���~c\FQ�F@Dx��_l�u��(�* 0Y�Sbq��ԳOK������>���Ww��4���On��-UZ�����{J�?�
��^�7IuVX��~��ʯ��|^�;�g#��'�ʐA����%�g0�~�7x"{v[�tx���w4��7bxK�t~�}����l
�&��%�?������9����J��{�/|:�7������)|b���>��v���)>�\�)�������S`����)/�	>H7��za�'�Iә�7�7� �pC���O�mG�-���4-�����;_-�]���pHG�^��<o>��-w�;�1��j�1 ���o �����E�ep��B� �C��)�(��id���'�)�w�����
�gC�3�!��[a�?rt31���0��ח�F��E_:�iF{�������,H�M��5�5��l�o�Z���z1ǅ��w��BnL�1�����}���C�y/�������ZGz/��5�V��2>���ɁA7�\C�+����҇	޲��J'�����҇!��g��v}}��S~F��'�m�d��?��K�0�b�M�j��Q8��,����\�^4:��o�S����A���BñH*����˫/xDHݿ�OHH͸�(�N��$9�K0�qRf�2 4W_�Խ�e�uY&qVĶӫ�V?`Nq���$�7�=&F*J�I��#��-��{�����"���=���E�uIZ��q�$΂ܫ/���* r\+b�w���PU�E�ħS��Z}ކ�*��%	L��Q�������e=a�vHɁ��Y���냮~�3;�z>@���8�Gv�gzH�?� ���Q�X���௡g�f�xÿ0�npFg�&�ƥ��Q
r�c/��`J�ȧh�}��2�� ��m��Ӑ��c�[��hhAsc�c�hs�ܘ��kc���9�����in�����C!|覄y;!|&�[�O����g�O���D�#>9t��V��Aj���}��%�~�Ϝ�~I�{?����o�L��́��H�N�'���7�0ku:)�6����Z���o�v��Q��{^�F�w�۹�`R�= ���>
-f>�	�-V�]�F��q������U���t�a��(�+vݍ��~����o��|:.��� �>ͣ*��G�~z�~���"�.��5]�/�8��QX�`A�ıK5��B���`�x/��֋ �*�+�{ctjep�w�z���
�fY� �N��yp�
po#`�Z�w�5�`�l�<�2�8����\��у���	%g)�zUpN,S���z����	qB����^�/�$���΅�ڕ_�*�|�#��[�����VEã,����n�����EI��8L9?Đ�4��r�l}#|v(K�`��2C��uZ!��,�}��nx��ķW�]�aX>���K��ќ����"C��C������f�?�M0���{�[��4E����sGL3��;��ҫg�0S���A�ꉍO���l�4���|(�ǧ��>0�)�T����p�Y�l Cq����I/�����"��ځ��֯���.Ӝ�tA�%���+C�@�Il��&���l�ҁbp��>�Eb��>�M�f$�}V�tN�F�������pI�����'v������f�Μ�>[��v���&2op���6݇��R��v���s�'w���$�1+��q˩�'���צ^�~��h�����,�RK"8��a���'���s��->�>��_��ؼ�΂A�&\ t}�կW�7h��I��=�P���#�7�/���� �QKW��wzr1��PH[r|��j�O�@k<J���O�f�J�I���Kҥ���jꏃ���t@ʸ���_P'�HT�ˊmd����ym��"��0
�
�$�+\��e��_�٢j�%p���������Z� ��-�ix��q*�0�ɇt�a$o_aQ���c)z%����4.Sx9`�i1��Fc�x�P9��i����+�����+��]C�r=o�BpY�更 ��R�M�c3�u�4*�{p�)Oz��c<�ʧVp��ɜA�ʹ����v���J�3���#�����d��PAF�F,�Y�&]�s;��b�a+9�Y�|�t��x�W���t�l�=xK��R�\'���ǉ-�Xļ�k�e��&h>Z:Z�n����h\�Ƭ q�&6��ER[�!Ԉ��Z�	-�����tO�-4���1���?��7��,�-�5[16��Ԙ/��/��-ֺtb$�b����I֒��\��I�(�Z|���M��RSYs�n���n;�l���Of��$��"�`��2O�S��Q��6[̲ �y������zmp�]+r�#���T�Q�y`Fz���F}�%�iee���2��4L�<ʚI�U'i݂G�v��]���i�bz�<�`��:�2�,L��b��b0 0�&��K�����:{�\�䉩P�Y��E���$�j^�Br��Ң=|m>��U4�YH�:(4h��_�VR.��j��f],"�˵1L���Զ/h�,)_�0��S|�x�a�ؼ`˘���)��?L.�M���Qy!OYʕ�C#�3���(�c��`"��rW�#����b�T�^�����F��QY�ߴrK�I�C�CrK"�P��1ʧ�n�����nHj#�Ϫ�I�b>�؊�����0�{{r�e�n��|�n>��R�m��g�nz���|�18pa���>��-Ĵv��K��%����%�k�4��j�'���-�5N�X�:Uw�y�K6�/&�d�N�C�Yٖ�D���)�l�+sx"Y)�X�����-R2S;�S�d8���Z<�j&)EՖJ®,2�G�C�����^�9��ۉ�2�\�Ǡj���Stv�f�1�-R�2����<�|�1/	I�(���^�r�=+�-t7�zlQ(��0	�H�t��̘b��8'k�>�L�̔    $��.�s�o����x��]���:]�{��a�R�(U�כj�D�槤����+7\�G0�7��G�K�mF�Y�0@H-J�Ǭ��V�\���2�nM��5�`X[-��N4�߰\c���N@�a���A��'�� X�n��B�m�bͮ^�� �ĩ.l�����վ+^��̒�\8M�|��	~�n*f�5n�v }��-�XkV��O7%�\0}uS­�1��:6��ќx�o5(5�й�QF�aX���8:&����4�Tu��n#E��z����:_�V��*6�7#��q����M��.�VL�dj���ޛ��o�6�a��=��-f������x���ݽ�^}N��1f�kk\y�̌eYo;]d~�J�� T����ۘS���X`�V�;�>ߵTdI��a���c�L�@Z�LX�^��M.�`7�*�(M�`��N�(�ˣB�Z���F��x��*����-��\��<��%
sJ�8�A�5�2�U����s�}I���h�¦�q�a@~E^8��L<^�qPz6ɮj����}���o^���@�����[4�����cC�V�%%�މ&�D_9�{n�rپ-�m@����2�QC�OHf 	UN6S�F��ԝV>�/��nLp6q��&��p��Q�M	[rk��u�?>$��g(�'�T��*��m��S+N����8'���*�`���֦?��$M�#�DR�`�C�jOR���O�kR�p�֐��l��g�J�E�bE�%4����MeA��w���[�ϯ�z.5d��tZ��Sw6I>"Hz:Χ�� ����8n薆�T���6{Wa�K�Z!:��M ���)qZ���I	ȧ����iLq��,�I��i�85��2���#�M�_o_k�t���YA~)�$���Z	+���an��hd;�Z�u��]�B��(L|��F�E�fF��c�̺,��#CX�O��
�p����dO��T�b�']_���%�/�@	җ�/�@���6���F��s!O��8�8�J��Psg�RN�s��@�q�:ڃSjo�\�[t��ES''�L���-���%�5�JNAg��f�4��|dy��s�,�\omlI	Le�#VHW)|J�D �9Ї[���k�y�F����_P� v02�e��E�y����Ɋ[3[TU^x�"��������ƾ����̪�N�dus1Jr�@���r���}�(Lb
-�Ƿ:���t}k~�� �,l�ºTo�hi��ռ���fV�N?&O��O��\6��vL��yk�v>�&�fhu��gq�x�]��iџ���W��)=*�֠L�/<f��W��}x�_�{ϟR�g>�\Rj�)W�u�i�� S��Nu��e'L[��a�����*Z1���w��>��v������G`����^cd붷ZҬ#��{�B�T`��&#`��`s�]L������ËL��6M��Q	�s�q�(�36th�Պx��̔�X�{�֮�[�ۘ��:0[RJ5���ؗ��L��*x�[���Ҳ%�չ�6S`��[۽������H���+����2��
��ܷ���d��H�i|ك��J`vX�(�S2C����ߤT��{4���ɭu�Q:)�~��;t��Ս�۔4�]=��w7Qx9	�`I���CIsf �\�=]_aKc!��ʲ$X�� k��F���m��̜�qsЉl˽+c6ek1��D��Ϸ�3��	U�x��;_:��
@z�_m4�:߽��TE�~������ײ�Kk�F�37�3�n��(���s{��ވƆ��;|�FލPь���qR|����ۦ�L��A�Pvڢ������5���
xqf�n~w��>���8Xz[��𙠛�1�-|>��7h���g��J8�`���ɸ�e��cRsm�0˔3���� Wڙ4��2��m�>��Q4�J=���u�ip�8,��I]�����Ӎa�܃���=h�]m��b�˙,U�2�v.Iۺ.7X/��S�0e���]�K��(X�Y�����V���v�vJN]�h�uï<x��x�Y�K��Y�e�7�Y�
�D�\9��<p����2B츘�:8�b���"sfkp��rIs
��y��ր��ê1�eN�oX�U��z��2�QlM֒7i��n�`{T0C0Y��Pۍ��Ó/���p�V��多�v��i^�ݐmzqj������t[�P�FkWv�c-�m���g�b��g��a��p��1b�J�0�|�t�Gd=�|��,�[���1cF�K��G�5�#|}���&����T#:��9@N��TCv��,�̔"#�棢NY�.���e��|�]�ӂֺ..4�Uf���vZj����U3Y(�9�s�X(e�ʩw�ܵ82P������:���p�`�t�D�Q4�6��<��8�*Q�ޖuA���]�G9/d{#m����]�?��͘萼iD���I�P�wX�ل��Yfe4!�c�1�"⽶�jH�h����z��m���rL���Jm�ڹ��z�����N�S�S�ԓ-�j�w�c��6���.�l��⹻�������g����c�e���ld�������������;�������e8�#��������dG�g�K�8O0c�p}���r'Z�F˝�0k��ӫK�@�|c,a��s��fCH�Y^�K�[�e����u��b�+�ٵ�Tr��C�I<�f"LZ68���Q6��Z�mu+��f���1��kɖ�OTw�m*ȳ�$��T䪈�� cuN������������YD��P�N�Cߨ/v��%a��+01�=�Whᐗ?�Y�s:�D��Vy(#����<<J�
'�﷣-���W'���<��|�/�V�a_�q�X��)K�����+{Pde�|L�M�����J"�	�[<1�8��Pؕ�Q�[�^䋽�L�a�Q$�h�����-EpS4���e�,�T�m:v��FH֒���+/=�7�b�6������)�t�k���$���o�o�F�{����4�Ne��<��Tz�=
i����� {��_��Y-�:֜�9��y�&��<��J7��͌_'���0���G���m�)ڨ�s����#_53Y�]Ѥ��O6��'8Y�B�S�Sr�y��6�x�V7&����i�����K�q���-
ek:�<f��[����c�laQH�P���ژ�O�@�|�����4�g�Fo�\C����Y{ѐ��` ���Gm�����+3�V�2L�.�<�����9�Ie>��;����N�wCS
�V;�b����(�ʳX)��e7ܡ�o�S�p��O䗴c(=�8Ě����'��������S)�O]���w&ܪS%�y2�p�N�����;x�����q�aٌ�@�+�p3�o[�}�S�Do�i�â���юa�ö�(��0-`n@e����6?�7Jc�@���9�6�-�`^��r�Dy��Y�T��aR��&Kz�ܶ������p�I,D���Z��l�9�Phdb����}��ܯ� "����@�m�t��Ĵ!�$�w�![=0���?��Le��|�]c�ܥ��)ک�66�8�w٧�1@���s[���ȸ���=����(p��"(	�g#h1��6�}�����Q��֍	�&�>��evE;|�72r�!�nL�+6��5t�Ǫ�{����hb�����p���~��ʎ)y�V�2\׺�t��V���}��%e��ƴ��g�b�v��N]n�K�I�%Y�/f`�
X*䶝?Z�-�7�IQf-��%im��M�ѳ6��'Y�3FZp�Z'�MB;Qr��h�8P݇
�(R$V?1ة�5C�(�J�t���j�7}��g@�2q�������U�V�?b�G^>>������s�j3��e���-p6��?�F�x]�8�b�%%j��}g��|[u�RE^8R�JU'O��zͩP��88)�����(��׏�p �¤ḵ�0��E[�Ny*?��l�w�=H�	�6�k|�B3���p��j�f?���>C��/7D�I#�@�o0��p� �
  1�K���������4d���W�%ʋ~�d݊T��}�dBA{Ŭ��q;T:���ic�fk��V���}f�Dz��cr���s���W�����n�5�	_L����ѹ�>E�&�|�]�|�9�^�3(P�q��S(P��O�_yC�ilԁ�hr'CF�Y�ڧ��+`N7T��i6�Vo4!�{;���c�Ѐ��~HFf��Cn�
�p��)�eq�ht��MƉDP�;ҼH[ラOw;I�m�>$h-9}�L��*�[r��%v���Q<� � o;���m,�M9�@Y|��4���#��I)���ψ��,�t��"!�R
y�0�$s��e��"����8���:�(�"<%D��"�f_�j���ȨCB�%�����e#D5�y����x/#Jڝ夕��+���ʙ3^z�d��x3�p��ad�	QŠ[N�����3�HS�#�~�?#W_����/X_���w��D%�Q��Ej�6{;Ɯ���{�{�� q����T{"��|G�k�&�ʈ"h�4��lw��Q`d�l&��E3X�eђ���$x�dK>�sɨH:�*����)�W{o��)߿S�����p�O�A�q�+;��ջyOW�th?�,�0!�V��&=:����b����+N��2	�l�X�m��n���aR�>����RF%�ɢ�Q�ky���/�4��9����u��M5�)a�:Պ[�wK�Z�Tk��J�����^*Ǽ)Ft����H�<Sg�(� ��~���,O�ٱdѸ����$6�Z6da�kzb�ip�ˤ��+�Z聒�/|_�p��}�޴i��|��=�l�۫����}��'^}����hz���k9�/Fj��*=je��mP$k���I�7FIv���ڵ��#|���"%�t1+:T"2b8��o� ����0i����%���I�GS�������.2�a��=k��վ�y��@`�E4]��,�'q�dIk�p���n�r��{<n�VqYT�4ݭ��%q�y���&�і��(e�D5��Z|gv��e�ӣ�.� tp�6A�G9�4��h$2T�H�n�$��I�9q���q����J��,���I���۸Ry5���D��v�`�;�_��ꑜ&���7�����]sS�#�whmȤ?s�Ƙ�<�ֵD�#�����90�i�ٲ_.��M���c���@L���N�|d�&471x$�~���i^9edM����p��#I[�
���9Rs�d�6����u؃���$F6�v�|:�����;٦�+�P�m�X>��3�}J�C>�|N���n��
&���b�|^�>��5>�I�l��'έ��g,Ҭ0��>u�1r�a�1�.��=e�����9�5ZR�l90L�u"}2F`��)��$k��X�y���j�B���~`7�Ƣ����%��Ym�f�z!ԙʶf"y�[����N��ni?�\�iE�\����H�S�#I�� Os���{��F�q��yp�|��:O1��YeIi��tl�PX��#
eA��Vz��c����^�v��l���(M�D-�.u/p��JR�g.��s!�C)��y�����Wx�d��v�91�޿6#e�Is��_��$�\a�s��7��*��[t8�K^|�kh��m��v���M�h�r�Ϲ�vv٣�4Tp�%Tʷ�vp�F[w�K\��V�+t���oq�i5i�q4��a�ã�Y���Z�a����FC��u����a��o�*�ʐ�l�!N�x�$�Ϝ@E2���l�(���c6��`�O�@q�A!��?�#�C>yL�V��	A�Md7�	O|���N4��{'�;H��D�fi-Y䤽j蠍��ن�0փl����|��6�+g���ZG>b��rix�qV[5�̂��F?|�.���&��� 5,i�e���<��,��S� ������sTzljxW�U���-��յ}"-�aTL�Ձ�5�0� �b��ݽ̖-���D`E���
����K��`��a}��HF)PJ�$���.���E-3;���	TYҁxȲ�ѕ�% �d��U�JYfe����q�w��d�0����?p��ݰ���R�N�S���*��$M�g� �CU5(�������/��d�N[:���\>�ΔS S�c:VX�=�J�&�h�OY�JG/DOI/&������D���`������T,#������a��2�Ζ7K7���'�z�W^�dd��Y������!�5t^0�@sO�+����5Z�����	"{�	�^ +��k��$�MeA5��*,Q�a[��!�n(ͷ��6��.}��!�<쓾mL�)�o�����|���I5Οp�4���&Z�>g���U�}M�H� W�4�5M�2�:[��g:B�^A� �R�N��1+à������'��ʋ���2>j�`���������b&�DѲ�_Q΂\�a�dڼ��ٓEΘa:�L�5��5�Q�&.P��m���n ���'U5�`E�����I��Z �q
�*=�ReG% P]�>��qe@�LV9;=������4M���?���Q,{h)�l���>�ɛ�~FQy������0���Vφ�ZR�aM�Q#i�E�o���J�����$m_G��`?�ڑ�! �T���(16��6P2l�/�@	ӕ�/ZSX����Z-��
i�N�<�5��V<���(�#�F�/"5�i����C\��j���o���L���l���\r�w��x�7��z�         X   x�e�1� й�@���=\8�1���n�'B��%ˌF�;�I�ZQd�	�ƚ۽&��IX$��!��u *̳�K8jm���s �Q         f   x�m̻�0���½a��Q�H�	���4)���sH�s!)r?"y�/�A߶6Ry"��x��Ϊ7	����9��W�I������+m�J~�[�Oը         r  x�}��jAE����tS����	��l��Bb����>-kF3Raf����SU����2�:�E-��:�>�<�L̑Z�<0�p��4�#����BW*�?ћG��2e��Ed�3)@e�}zy;�~:ߟ��n�@�O���� �� �����+���~Eva�J �g��6M%7��E�B������ܳef��x�]s(����9UD=�P�\]�����U�g��6JR�eoQ��������Ξ�4T��z�E���4K��P���Ń��V|ɷ(�V�k6�Lt̆�t�Tջ�>��z���Y����2ބ�4�M��榕h��ҵ%2o��XL/E�3�Q];!A<�>����%���e�;�k��ާ�G%�^�4k�S��Q^;�ą]�EԀEz�e�Q��;�k����(��U�Ra,��^�]I��~�"S�e1�Ü:��d�J2x�`EF�u3����/��d-�z�lE����w=���k��Z��R�^q�Qd	���F�Ե�t�}��>�>��������ӵ�SN�=1�Qd�֦�G�U���ӏ翯'og׮Hr;�4_>�&�R�p�Fd,��G�������ep1����7ea>��:Y2��W�2Y�R�����     