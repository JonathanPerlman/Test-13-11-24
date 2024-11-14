import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getOrganization } from "../../store/feathers/organization";
import {jwtDecode} from 'jwt-decode';
import OrganizationForm from '../../componnents/OganizationForm';

const OrganizationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { organization, status, error } = useSelector((state: RootState) => state.organization);
  const [isLocation, setIsLocation] = useState(""); 

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode<{ userId: string; organization: string; region: string }>(token);
        setIsLocation(decoded.region); 
        dispatch(getOrganization({id: decoded.userId, organization: decoded.organization, region: decoded.region}));
      }
  }, [dispatch]);

  if (status === 'loading') return <p>טוען את רשימת הטילים...</p>;
  if (status === 'failed') return <p>שגיאה: {error}</p>;

  return (
    <div>
      {status === 'succeeded' && organization ? (
        <OrganizationForm organization={organization} isLocation={isLocation} />
      ) : (
        <p>אין מועמדים להציג.</p>
      )}
    </div>
  );
};

export default OrganizationPage;
