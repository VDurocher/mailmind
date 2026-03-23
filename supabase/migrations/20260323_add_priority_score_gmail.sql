-- Migration : ajout priority_score, gmail_message_id, et extension des catégories
-- À exécuter dans le SQL Editor Supabase : https://supabase.com/dashboard/project/fdrxlbhixtgrgaahhmml/sql/new

-- 1. Ajouter les nouvelles colonnes
ALTER TABLE public.email_analyses
  ADD COLUMN IF NOT EXISTS priority_score NUMERIC(4,1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS gmail_message_id TEXT;

-- 2. Mettre à jour la contrainte CHECK sur category (8 catégories)
ALTER TABLE public.email_analyses
  DROP CONSTRAINT IF EXISTS email_analyses_category_check;

ALTER TABLE public.email_analyses
  ADD CONSTRAINT email_analyses_category_check CHECK (
    category IN (
      'complaint',
      'sales_lead',
      'technical_question',
      'billing',
      'feature_request',
      'partnership',
      'onboarding',
      'churn_risk'
    )
  );

-- 3. Index sur gmail_message_id pour les recherches futures
CREATE INDEX IF NOT EXISTS idx_email_analyses_gmail_message_id
  ON public.email_analyses (gmail_message_id)
  WHERE gmail_message_id IS NOT NULL;

-- 4. Index sur priority_score pour les tris
CREATE INDEX IF NOT EXISTS idx_email_analyses_user_priority
  ON public.email_analyses (user_id, priority_score DESC);

-- Rollback :
-- ALTER TABLE public.email_analyses DROP COLUMN IF EXISTS priority_score;
-- ALTER TABLE public.email_analyses DROP COLUMN IF EXISTS gmail_message_id;
-- DROP INDEX IF EXISTS idx_email_analyses_gmail_message_id;
-- DROP INDEX IF EXISTS idx_email_analyses_user_priority;
-- ALTER TABLE public.email_analyses DROP CONSTRAINT IF EXISTS email_analyses_category_check;
-- ALTER TABLE public.email_analyses ADD CONSTRAINT email_analyses_category_check
--   CHECK (category IN ('complaint', 'sales_lead', 'technical_question'));
