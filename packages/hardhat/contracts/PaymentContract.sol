//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PaymentContract
 * @dev A contract that handles payments with conservation fees
 */
contract PaymentContract is Ownable {
    // State variables
    mapping(address => uint256) public balances;
    address public conservationWallet;
    uint256 public feePercentage; // Configurable fee percentage
    
    // Events
    event PaymentReceived(address indexed from, uint256 amount);
    event ConservationFeePaid(address indexed from, uint256 amount);
    event ConservationWalletUpdated(address indexed newWallet);
    event FeePercentageUpdated(uint256 newFeePercentage);

    constructor(address _conservationWallet) Ownable(msg.sender) {
        require(_conservationWallet != address(0), "Invalid conservation wallet address");
        conservationWallet = _conservationWallet;
        feePercentage = 5; // Initialize with 5% fee
    }

    /**
     * @dev Update the conservation wallet address
     * @param newWallet New conservation wallet address
     */
    function updateConservationWallet(address newWallet) external onlyOwner {
        require(newWallet != address(0), "Invalid conservation wallet address");
        conservationWallet = newWallet;
        emit ConservationWalletUpdated(newWallet);
    }

    /**
     * @dev Update the fee percentage
     * @param newFeePercentage New fee percentage (0-100)
     */
    function updateFeePercentage(uint256 newFeePercentage) external onlyOwner {
        require(newFeePercentage <= 100, "Fee percentage cannot exceed 100%");
        feePercentage = newFeePercentage;
        emit FeePercentageUpdated(newFeePercentage);
    }

    /**
     * @dev Deposit funds to the contract with conservation fee
     */
    function deposit() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        
        // Calculate fee amount based on current fee percentage
        uint256 feeAmount = (msg.value * feePercentage) / 100;
        uint256 depositAmount = msg.value - feeAmount;
        
        // Update user's balance with remaining amount
        balances[msg.sender] += depositAmount;
        
        // Transfer fee to conservation wallet
        (bool success, ) = conservationWallet.call{value: feeAmount}("");
        require(success, "Fee transfer failed");
        
        emit PaymentReceived(msg.sender, depositAmount);
        emit ConservationFeePaid(msg.sender, feeAmount);
    }

    /**
     * @dev Function to receive ETH
     */
    receive() external payable {
        deposit();
    }
} 