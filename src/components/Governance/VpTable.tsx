import CustomTable from '../DataDisplay/CustomTable';
import { Box } from '@chakra-ui/react';
import CustomSkeleton from '../skeleton/CustomSkeleton';
import useVpTableEffect from '../../hooks/useVpTableEffect';


const VpTable = () => {
    const tableArray = useVpTableEffect();

    return (
        <Box>
            {tableArray && tableArray.length === 0 ?
                <CustomSkeleton count={4} height="50px" /> : <CustomTable
                    keys={Object.keys(tableArray[0])}
                    data={tableArray}
                />}
        </Box>
    );
};

export default VpTable;
