-- Update combo discount percentage from 7% to 28%
-- This reflects the actual discount: (1798 - 1299) / 1798 * 100 = 28%

UPDATE combos
SET discount_percentage = 28
WHERE name = 'YumBurst Combo Pack';

