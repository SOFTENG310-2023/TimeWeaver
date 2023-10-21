
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

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."calendar" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "group_id" "uuid",
    "name" "text" DEFAULT ''::"text" NOT NULL
);

ALTER TABLE "public"."calendar" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."calendar_group" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL
);

ALTER TABLE "public"."calendar_group" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."group_users" (
    "group_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."group_users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."selected_slots" (
    "id" bigint NOT NULL,
    "day" "text" NOT NULL,
    "calendar_id" "uuid" NOT NULL,
    "timeslot" time without time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."selected_slots" OWNER TO "postgres";

ALTER TABLE "public"."selected_slots" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."selected_slots_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."user" (
    "id" "uuid" NOT NULL,
    "name" "text",
    "calendar_ids" bigint[],
    "group_ids" bigint[]
);

ALTER TABLE "public"."user" OWNER TO "postgres";

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "User_calendar_ids_key" UNIQUE ("calendar_ids");

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."calendar_group"
    ADD CONSTRAINT "calendar_group_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."calendar"
    ADD CONSTRAINT "calendar_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."group_users"
    ADD CONSTRAINT "group_users_pkey" PRIMARY KEY ("group_id", "user_id");

ALTER TABLE ONLY "public"."selected_slots"
    ADD CONSTRAINT "selected_slots_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."calendar"
    ADD CONSTRAINT "calendar_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."calendar_group"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."group_users"
    ADD CONSTRAINT "group_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."calendar_group"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."group_users"
    ADD CONSTRAINT "group_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."selected_slots"
    ADD CONSTRAINT "selected_slots_calendar_id_fkey" FOREIGN KEY ("calendar_id") REFERENCES "public"."calendar"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable insert for anyone" ON "public"."user" FOR INSERT TO "anon" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."calendar" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."calendar_group" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."group_users" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."selected_slots" FOR SELECT USING (true);

ALTER TABLE "public"."user" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."calendar" TO "anon";
GRANT ALL ON TABLE "public"."calendar" TO "authenticated";
GRANT ALL ON TABLE "public"."calendar" TO "service_role";

GRANT ALL ON TABLE "public"."calendar_group" TO "anon";
GRANT ALL ON TABLE "public"."calendar_group" TO "authenticated";
GRANT ALL ON TABLE "public"."calendar_group" TO "service_role";

GRANT ALL ON TABLE "public"."group_users" TO "anon";
GRANT ALL ON TABLE "public"."group_users" TO "authenticated";
GRANT ALL ON TABLE "public"."group_users" TO "service_role";

GRANT ALL ON TABLE "public"."selected_slots" TO "anon";
GRANT ALL ON TABLE "public"."selected_slots" TO "authenticated";
GRANT ALL ON TABLE "public"."selected_slots" TO "service_role";

GRANT ALL ON SEQUENCE "public"."selected_slots_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."selected_slots_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."selected_slots_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
