// Importações 
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import type { LocaleKey } from '../../../i18n/LocaleContext';
import { useLocale, LOCALE_OPTIONS } from '../../../i18n/LocaleContext';

interface HeaderProps {
  showLogout?: boolean;
  onLogout?: () => void;
}

export default function Header({ showLogout = false, onLogout }: HeaderProps) {
  const { locale, setLocale } = useLocale();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const currentLabel = LOCALE_OPTIONS.find(o => o.value === locale)?.value.toUpperCase() ?? 'PT-BR';

  // HEADER PRINCIPAL DA APLICAÇÃO
  return (
    <AppBar position="static" sx={{ backgroundColor: '#6B21A8' }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 48 }}>

        <Typography
          variant="h6"
          sx={{ color: '#fff', letterSpacing: 1, fontWeight: 'bold', fontStyle: 'italic' }}
        >
          fly.id
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

          <Button
            size="small"
            startIcon={<LanguageIcon sx={{ fontSize: 16 }} />}
            onClick={e => setAnchor(e.currentTarget)}
            sx={{
              color: '#fff',
              textTransform: 'none',
              fontSize: 13,
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 1,
              px: 1.2,
              py: 0.4,
              minWidth: 0,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            {currentLabel}
          </Button>

          {/* Menu de seleção de idioma */}
          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
            slotProps={{ paper: { sx: { minWidth: 160 } } }}
          >
            {LOCALE_OPTIONS.map(opt => (
              <MenuItem
                key={opt.value}
                selected={opt.value === locale}
                onClick={() => {
                  setLocale(opt.value as LocaleKey);
                  setAnchor(null);
                }}
                sx={{ fontSize: 14 }}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Menu>

           {/* Botão de logout (Em caso de autenticação) */}
          {showLogout && (
            <Button
              size="small"
              onClick={onLogout}
              sx={{
                color: '#fff',
                textTransform: 'none',
                fontSize: 13,
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: 1,
                px: 1.2,
                py: 0.4,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Sair
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}